import inquirer from 'inquirer';
import chalk from 'chalk';
import { 
    MONSTERS,
    CR_TO_XP,
    ENCOUNTER_MULTIPLIERS,
    DIFFICULTY_THRESHOLDS,
    MONSTER_TYPES
} from '../data/monsters.js';
import { SOURCEBOOKS } from '../config/sourcebooks.js';

const getEnabledSourcebooks = () => {
    return Object.entries(SOURCEBOOKS)
        .filter(([_, book]) => book.enabled)
        .map(([key, _]) => key);
};

const getAvailableMonsters = (enabledBooks, filters = {}) => {
    return Object.values(MONSTERS)
        .filter(monster => {
            // Filter by sourcebook
            if (!enabledBooks.includes(monster.source)) return false;
            
            // Filter by CR range if specified
            if (filters.minCR !== undefined) {
                const monsterCR = parseCR(monster.cr);
                if (monsterCR < filters.minCR) return false;
            }
            if (filters.maxCR !== undefined) {
                const monsterCR = parseCR(monster.cr);
                if (monsterCR > filters.maxCR) return false;
            }

            // Filter by type if specified
            if (filters.type && monster.type !== filters.type) return false;

            return true;
        })
        .map(monster => ({
            name: `${monster.name} (${monster.source} - CR ${monster.cr})`,
            value: monster
        }));
};

const parseCR = (cr) => {
    if (typeof cr === 'number') return cr;
    if (cr.includes('/')) {
        const [num, den] = cr.split('/');
        return parseInt(num) / parseInt(den);
    }
    return parseInt(cr);
};

const getMultiplier = (monsterCount) => {
    if (monsterCount === 1) return ENCOUNTER_MULTIPLIERS[1];
    if (monsterCount === 2) return ENCOUNTER_MULTIPLIERS[2];
    if (monsterCount >= 3 && monsterCount <= 6) return ENCOUNTER_MULTIPLIERS['3-6'];
    if (monsterCount >= 7 && monsterCount <= 10) return ENCOUNTER_MULTIPLIERS['7-10'];
    if (monsterCount >= 11 && monsterCount <= 14) return ENCOUNTER_MULTIPLIERS['11-14'];
    return ENCOUNTER_MULTIPLIERS['15+'];
};

const calculateDifficulty = (totalXP, partyLevels) => {
    // Calculate party thresholds
    const partyThresholds = {
        easy: 0,
        medium: 0,
        hard: 0,
        deadly: 0
    };

    partyLevels.forEach(level => {
        const thresholds = DIFFICULTY_THRESHOLDS[level];
        partyThresholds.easy += thresholds.easy;
        partyThresholds.medium += thresholds.medium;
        partyThresholds.hard += thresholds.hard;
        partyThresholds.deadly += thresholds.deadly;
    });

    // Determine difficulty
    if (totalXP >= partyThresholds.deadly) return 'Deadly';
    if (totalXP >= partyThresholds.hard) return 'Hard';
    if (totalXP >= partyThresholds.medium) return 'Medium';
    if (totalXP >= partyThresholds.easy) return 'Easy';
    return 'Trivial';
};

const calculateEncounter = async () => {
    // First, let user configure sourcebooks
    const { configureSourcebooks } = await inquirer.prompt({
        type: 'confirm',
        name: 'configureSourcebooks',
        message: 'Would you like to configure which sourcebooks to use?',
        default: false
    });

    if (configureSourcebooks) {
        const { selectedBooks } = await inquirer.prompt({
            type: 'checkbox',
            name: 'selectedBooks',
            message: 'Select which sourcebooks to enable:',
            choices: Object.values(SOURCEBOOKS).map(book => ({
                name: book.name,
                value: book.abbreviation,
                checked: book.enabled
            })),
            validate: (answer) => {
                if (answer.length < 1) {
                    return 'You must select at least one sourcebook!';
                }
                return true;
            }
        });

        // Update sourcebook enabled status
        Object.keys(SOURCEBOOKS).forEach(key => {
            SOURCEBOOKS[key].enabled = selectedBooks.includes(key);
        });
    }

    const enabledBooks = getEnabledSourcebooks();

    // Get party information
    const partyQuestions = [
        {
            type: 'number',
            name: 'partySize',
            message: 'How many players are in the party?',
            validate: (value) => {
                const valid = !isNaN(value) && value > 0 && value <= 10;
                return valid || 'Please enter a number between 1 and 10';
            }
        }
    ];

    const { partySize } = await inquirer.prompt(partyQuestions);

    // Get level for each party member
    const partyLevels = [];
    for (let i = 0; i < partySize; i++) {
        const { level } = await inquirer.prompt({
            type: 'number',
            name: 'level',
            message: `Enter level for player ${i + 1}:`,
            validate: (value) => {
                const valid = !isNaN(value) && value > 0 && value <= 20;
                return valid || 'Please enter a level between 1 and 20';
            }
        });
        partyLevels.push(level);
    }

    // Get monster selection preferences
    const { useFilters } = await inquirer.prompt({
        type: 'confirm',
        name: 'useFilters',
        message: 'Would you like to filter the monster list?',
        default: false
    });

    let filters = {};
    if (useFilters) {
        const filterQuestions = [
            {
                type: 'number',
                name: 'minCR',
                message: 'Minimum CR (optional, press Enter to skip):',
                validate: (value) => {
                    if (value === '') return true;
                    return !isNaN(value) && value >= 0 || 'Please enter a valid CR';
                }
            },
            {
                type: 'number',
                name: 'maxCR',
                message: 'Maximum CR (optional, press Enter to skip):',
                validate: (value) => {
                    if (value === '') return true;
                    return !isNaN(value) && value >= 0 || 'Please enter a valid CR';
                }
            },
            {
                type: 'list',
                name: 'type',
                message: 'Filter by monster type (optional):',
                choices: [
                    { name: 'All Types', value: null },
                    ...MONSTER_TYPES.map(type => ({
                        name: type.charAt(0).toUpperCase() + type.slice(1),
                        value: type
                    }))
                ]
            }
        ];

        filters = await inquirer.prompt(filterQuestions);
    }

    // Get monsters for encounter
    const monsters = [];
    let addingMonsters = true;

    while (addingMonsters) {
        const monsterQuestions = [
            {
                type: 'list',
                name: 'monster',
                message: 'Select a monster:',
                choices: getAvailableMonsters(enabledBooks, filters)
            },
            {
                type: 'number',
                name: 'count',
                message: 'How many of this monster?',
                validate: (value) => {
                    const valid = !isNaN(value) && value > 0;
                    return valid || 'Please enter a valid number';
                }
            }
        ];

        const { monster, count } = await inquirer.prompt(monsterQuestions);
        monsters.push({ monster, count });

        const { addMore } = await inquirer.prompt({
            type: 'confirm',
            name: 'addMore',
            message: 'Would you like to add more monsters?',
            default: false
        });

        addingMonsters = addMore;
    }

    // Calculate encounter difficulty
    let totalXP = 0;
    let totalMonsters = 0;

    monsters.forEach(({ monster, count }) => {
        totalMonsters += count;
        totalXP += CR_TO_XP[monster.cr] * count;
    });

    const multiplier = getMultiplier(totalMonsters);
    const adjustedXP = totalXP * multiplier;
    const difficulty = calculateDifficulty(adjustedXP, partyLevels);

    // Display results
    console.log(chalk.green('\nEncounter Summary'));
    console.log(chalk.yellow('\nParty Information:'));
    console.log(`Party Size: ${partySize}`);
    console.log(`Party Levels: ${partyLevels.join(', ')}`);

    console.log(chalk.yellow('\nMonsters:'));
    monsters.forEach(({ monster, count }) => {
        console.log(`${count}x ${monster.name} (CR ${monster.cr})`);
    });

    console.log(chalk.yellow('\nDifficulty Calculation:'));
    console.log(`Raw XP: ${totalXP}`);
    console.log(`Multiplier: ${multiplier} (${totalMonsters} monsters)`);
    console.log(`Adjusted XP: ${adjustedXP}`);
    console.log(chalk.blue(`\nEncounter Difficulty: ${chalk.bold(difficulty)}`));

    const { calculateAnother } = await inquirer.prompt({
        type: 'confirm',
        name: 'calculateAnother',
        message: 'Would you like to calculate another encounter?',
        default: false
    });

    if (calculateAnother) {
        await calculateEncounter();
    }
};

export {
    calculateEncounter as default,
    calculateDifficulty,
    getMultiplier,
    parseCR,
    getAvailableMonsters
};
