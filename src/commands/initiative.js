import inquirer from 'inquirer';
import chalk from 'chalk';

// Initiative variants
const INITIATIVE_VARIANTS = {
    STANDARD: {
        name: 'Standard (d20 + DEX)',
        description: 'Roll d20 and add Dexterity modifier'
    },
    ADVANTAGE: {
        name: 'Advantage',
        description: 'Roll 2d20 and take the higher roll (Alert feat, etc.)'
    },
    GROUP: {
        name: 'Group Initiative',
        description: 'Roll once for each type of creature'
    },
    SPEED_FACTOR: {
        name: 'Speed Factor',
        description: 'Modified initiative based on action type and weapon size (DMG variant)'
    }
};

// Speed factor modifiers
const SPEED_FACTOR_MODIFIERS = {
    WEAPON_SIZE: {
        LIGHT: 2,
        NORMAL: 0,
        HEAVY: -2,
        RANGED: -5
    },
    ACTION_TYPE: {
        MELEE: 0,
        RANGED: -2,
        SPELL: {
            CANTRIP: 0,
            LEVEL_1: -1,
            LEVEL_2: -2,
            LEVEL_3: -3,
            LEVEL_4: -4,
            LEVEL_5: -5,
            LEVEL_6: -6,
            LEVEL_7: -7,
            LEVEL_8: -8,
            LEVEL_9: -9
        }
    }
};

// Pure function to create a combatant
const createCombatant = (name, initiative, dexMod = 0, type = 'PC') => ({
    name,
    initiative,
    dexMod,
    type,
    conditions: [],
    notes: ''
});

// Pure function to create initial combat state
const createCombatState = (variant = 'STANDARD') => ({
    combatants: [],
    currentRound: 1,
    currentTurn: 0,
    variant
});

// Pure functions for dice rolling
const rollD20 = () => Math.floor(Math.random() * 20) + 1;

const rollInitiative = (dexMod = 0, advantage = false) => {
    const roll1 = rollD20();
    if (!advantage) return roll1 + dexMod;
    
    const roll2 = rollD20();
    return Math.max(roll1, roll2) + dexMod;
};

const rollSpeedFactorInitiative = (dexMod, weaponSize, actionType, spellLevel = null) => {
    const baseRoll = rollInitiative(dexMod);
    let modifier = SPEED_FACTOR_MODIFIERS.WEAPON_SIZE[weaponSize] || 0;
    
    if (actionType === 'SPELL' && spellLevel !== null) {
        modifier += SPEED_FACTOR_MODIFIERS.ACTION_TYPE.SPELL[`LEVEL_${spellLevel}`] || 0;
    } else {
        modifier += SPEED_FACTOR_MODIFIERS.ACTION_TYPE[actionType] || 0;
    }
    
    return baseRoll + modifier;
};

// Pure functions for combat management
const addCombatant = (state, combatant) => {
    const newCombatants = [...state.combatants, combatant];
    return {
        ...state,
        combatants: sortCombatants(newCombatants)
    };
};

const removeCombatant = (state, name) => ({
    ...state,
    combatants: state.combatants.filter(c => c.name !== name)
});

const sortCombatants = (combatants) => 
    [...combatants].sort((a, b) => {
        if (b.initiative === a.initiative) {
            return b.dexMod - a.dexMod;
        }
        return b.initiative - a.initiative;
    });

const nextTurn = (state) => {
    let newTurn = state.currentTurn + 1;
    let newRound = state.currentRound;

    if (newTurn >= state.combatants.length) {
        newTurn = 0;
        newRound++;
    }

    return {
        ...state,
        currentTurn: newTurn,
        currentRound: newRound
    };
};

const addCondition = (state, combatantName, condition, duration = null) => ({
    ...state,
    combatants: state.combatants.map(c => 
        c.name === combatantName
            ? { ...c, conditions: [...c.conditions, { name: condition, duration }] }
            : c
    )
});

const removeCondition = (state, combatantName, condition) => ({
    ...state,
    combatants: state.combatants.map(c => 
        c.name === combatantName
            ? { ...c, conditions: c.conditions.filter(cond => cond.name !== condition) }
            : c
    )
});

const updateConditions = (state) => ({
    ...state,
    combatants: state.combatants.map(c => ({
        ...c,
        conditions: c.conditions
            .map(condition => ({
                ...condition,
                duration: condition.duration === null ? null : condition.duration - 1
            }))
            .filter(condition => condition.duration === null || condition.duration > 0)
    }))
});

// Display functions
const displayCombatState = (state) => {
    console.log(chalk.yellow(`\nRound ${state.currentRound}`));
    state.combatants.forEach((c, i) => {
        const current = i === state.currentTurn ? '► ' : '  ';
        const conditions = c.conditions.length 
            ? chalk.red(` (${c.conditions.map(cond => cond.name).join(', ')})`)
            : '';
        console.log(
            `${current}${chalk.green(c.name)} - Initiative: ${c.initiative}${conditions}`
        );
    });
};

// Main initiative tracking function
export const trackInitiative = async () => {
    // Initialize combat state
    let state = createCombatState();

    // Select initiative variant
    const { variant } = await inquirer.prompt({
        type: 'list',
        name: 'variant',
        message: 'Select initiative variant:',
        choices: Object.entries(INITIATIVE_VARIANTS).map(([key, value]) => ({
            name: `${value.name} - ${value.description}`,
            value: key
        }))
    });

    state = { ...state, variant };

    // Add combatants
    let addingCombatants = true;
    while (addingCombatants) {
        const { type } = await inquirer.prompt({
            type: 'list',
            name: 'type',
            message: 'Add combatant type:',
            choices: [
                { name: 'Player Character', value: 'PC' },
                { name: 'Monster/NPC', value: 'NPC' },
                { name: 'Group', value: 'GROUP' },
                { name: 'Done Adding', value: 'DONE' }
            ]
        });

        if (type === 'DONE') {
            addingCombatants = false;
            continue;
        }

        const { name, dexMod, weaponSize, actionType, spellLevel } = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter combatant name:',
                validate: (value) => value.length > 0
            },
            {
                type: 'number',
                name: 'dexMod',
                message: 'Enter Dexterity modifier:',
                default: 0
            },
            ...(variant === 'SPEED_FACTOR' ? [
                {
                    type: 'list',
                    name: 'weaponSize',
                    message: 'Select weapon size:',
                    choices: Object.keys(SPEED_FACTOR_MODIFIERS.WEAPON_SIZE)
                },
                {
                    type: 'list',
                    name: 'actionType',
                    message: 'Select action type:',
                    choices: ['MELEE', 'RANGED', 'SPELL']
                },
                {
                    type: 'list',
                    name: 'spellLevel',
                    message: 'Select spell level:',
                    choices: ['CANTRIP', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                    when: (answers) => answers.actionType === 'SPELL'
                }
            ] : [])
        ]);

        const initiative = variant === 'SPEED_FACTOR'
            ? rollSpeedFactorInitiative(dexMod, weaponSize, actionType, spellLevel)
            : rollInitiative(dexMod, variant === 'ADVANTAGE');

        const combatant = createCombatant(name, initiative, dexMod, type);
        state = addCombatant(state, combatant);
    }

    // Combat loop
    let running = true;
    while (running && state.combatants.length > 0) {
        displayCombatState(state);

        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'Choose action:',
            choices: [
                { name: 'Next Turn', value: 'NEXT' },
                { name: 'Add Condition', value: 'ADD_CONDITION' },
                { name: 'Remove Condition', value: 'REMOVE_CONDITION' },
                { name: 'Remove Combatant', value: 'REMOVE' },
                { name: 'End Combat', value: 'END' }
            ]
        });

        switch (action) {
            case 'NEXT':
                state = nextTurn(state);
                state = updateConditions(state);
                break;

            case 'ADD_CONDITION': {
                const { combatant, condition, duration } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'combatant',
                        message: 'Select combatant:',
                        choices: state.combatants.map(c => c.name)
                    },
                    {
                        type: 'input',
                        name: 'condition',
                        message: 'Enter condition name:'
                    },
                    {
                        type: 'number',
                        name: 'duration',
                        message: 'Enter duration (rounds, leave empty for permanent):',
                        default: null
                    }
                ]);
                state = addCondition(state, combatant, condition, duration);
                break;
            }

            case 'REMOVE_CONDITION': {
                const { combatant, condition } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'combatant',
                        message: 'Select combatant:',
                        choices: state.combatants.filter(c => c.conditions.length > 0).map(c => c.name)
                    },
                    {
                        type: 'list',
                        name: 'condition',
                        message: 'Select condition to remove:',
                        choices: (answers) => {
                            const combatant = state.combatants.find(c => c.name === answers.combatant);
                            return combatant.conditions.map(c => c.name);
                        }
                    }
                ]);
                state = removeCondition(state, combatant, condition);
                break;
            }

            case 'REMOVE': {
                const { combatant } = await inquirer.prompt({
                    type: 'list',
                    name: 'combatant',
                    message: 'Select combatant to remove:',
                    choices: state.combatants.map(c => c.name)
                });
                state = removeCombatant(state, combatant);
                break;
            }

            case 'END':
                running = false;
                break;
        }
    }
};
