import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { NPC_TEMPLATES, NPC_TRAITS } from '../data/npc-templates.js';
import { SOURCEBOOKS } from '../config/sourcebooks.js';

const getEnabledSourcebooks = () => {
    return Object.entries(SOURCEBOOKS)
        .filter(([_, book]) => book.enabled)
        .map(([key, _]) => key);
};

const getAvailableTemplates = (enabledBooks) => {
    return Object.values(NPC_TEMPLATES)
        .filter(template => enabledBooks.includes(template.source))
        .map(template => ({
            name: `${template.name} (${template.source} - CR ${template.cr})`,
            value: template
        }));
};

const rollAbilityScore = () => {
    const rolls = Array(4).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
    return rolls.sort((a, b) => b - a).slice(0, 3).reduce((sum, num) => sum + num, 0);
};

const generateStats = () => ({
    strength: rollAbilityScore(),
    dexterity: rollAbilityScore(),
    constitution: rollAbilityScore(),
    intelligence: rollAbilityScore(),
    wisdom: rollAbilityScore(),
    charisma: rollAbilityScore()
});

const getRandomTrait = (category) => {
    const traits = NPC_TRAITS[category];
    return traits[Math.floor(Math.random() * traits.length)];
};

export const generateNPC = async () => {
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

    const questions = [
        {
            type: 'confirm',
            name: 'randomize',
            message: 'Would you like to randomize all NPC attributes?',
            default: false
        },
        {
            type: 'input',
            name: 'name',
            message: 'Enter NPC name:',
            when: answers => !answers.randomize,
            validate: input => input.length > 0 || 'Name cannot be empty'
        },
        {
            type: 'list',
            name: 'template',
            message: 'Choose NPC template:',
            choices: getAvailableTemplates(enabledBooks),
            when: answers => !answers.randomize
        }
    ];

    let answers = await inquirer.prompt(questions);
    const stats = generateStats();

    if (answers.randomize) {
        const availableTemplates = getAvailableTemplates(enabledBooks);
        answers = {
            name: 'NPC_' + Math.floor(Math.random() * 1000),
            template: availableTemplates[Math.floor(Math.random() * availableTemplates.length)].value
        };
    }

    // Generate personality traits
    const traits = {
        personality: getRandomTrait('PERSONALITY'),
        ideal: getRandomTrait('IDEALS'),
        bond: getRandomTrait('BONDS'),
        flaw: getRandomTrait('FLAWS'),
        mannerism: getRandomTrait('MANNERISMS')
    };

    const npc = {
        ...answers,
        stats,
        traits,
        sourcebooks: enabledBooks
    };

    console.log(chalk.green('\nNPC Generated!'));
    console.log(chalk.yellow('\nNPC Details:'));
    console.log(chalk.blue('Name:'), npc.name);
    console.log(chalk.blue('Template:'), `${npc.template.name} (${npc.template.source})`);
    console.log(chalk.blue('Category:'), npc.template.category);
    console.log(chalk.blue('CR:'), npc.template.cr);
    console.log(chalk.blue('Type:'), npc.template.type);

    console.log(chalk.yellow('\nPersonality:'));
    console.log(chalk.blue('Personality Trait:'), npc.traits.personality);
    console.log(chalk.blue('Ideal:'), npc.traits.ideal);
    console.log(chalk.blue('Bond:'), npc.traits.bond);
    console.log(chalk.blue('Flaw:'), npc.traits.flaw);
    console.log(chalk.blue('Mannerism:'), npc.traits.mannerism);

    console.log(chalk.yellow('\nAbility Scores:'));
    Object.entries(npc.stats).forEach(([ability, score]) => {
        const modifier = Math.floor((score - 10) / 2);
        console.log(chalk.blue(ability.charAt(0).toUpperCase() + ability.slice(1) + ':'),
            score, chalk.yellow(`(${modifier >= 0 ? '+' : ''}${modifier})`));
    });

    const { saveNPC } = await inquirer.prompt({
        type: 'confirm',
        name: 'saveNPC',
        message: 'Would you like to save this NPC to a file?',
        default: true
    });

    if (saveNPC) {
        const filename = `${npc.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
        const filepath = path.join(process.cwd(), 'npcs', filename);
        
        await fs.ensureDir(path.join(process.cwd(), 'npcs'));
        
        const npcData = `
D&D NPC Sheet
------------
Name: ${npc.name}
Template: ${npc.template.name} (${npc.template.source})
Category: ${npc.template.category}
CR: ${npc.template.cr}
Type: ${npc.template.type}

Personality
----------
Personality Trait: ${npc.traits.personality}
Ideal: ${npc.traits.ideal}
Bond: ${npc.traits.bond}
Flaw: ${npc.traits.flaw}
Mannerism: ${npc.traits.mannerism}

Ability Scores
-------------
Strength: ${npc.stats.strength} (${Math.floor((npc.stats.strength - 10) / 2) >= 0 ? '+' : ''}${Math.floor((npc.stats.strength - 10) / 2)})
Dexterity: ${npc.stats.dexterity} (${Math.floor((npc.stats.dexterity - 10) / 2) >= 0 ? '+' : ''}${Math.floor((npc.stats.dexterity - 10) / 2)})
Constitution: ${npc.stats.constitution} (${Math.floor((npc.stats.constitution - 10) / 2) >= 0 ? '+' : ''}${Math.floor((npc.stats.constitution - 10) / 2)})
Intelligence: ${npc.stats.intelligence} (${Math.floor((npc.stats.intelligence - 10) / 2) >= 0 ? '+' : ''}${Math.floor((npc.stats.intelligence - 10) / 2)})
Wisdom: ${npc.stats.wisdom} (${Math.floor((npc.stats.wisdom - 10) / 2) >= 0 ? '+' : ''}${Math.floor((npc.stats.wisdom - 10) / 2)})
Charisma: ${npc.stats.charisma} (${Math.floor((npc.stats.charisma - 10) / 2) >= 0 ? '+' : ''}${Math.floor((npc.stats.charisma - 10) / 2)})

Sourcebooks Used
---------------
${npc.sourcebooks.join(', ')}
`;

        await fs.writeFile(filepath, npcData);
        console.log(chalk.green(`\nNPC saved to ${filename}`));
    }

    const { generateAnother } = await inquirer.prompt({
        type: 'confirm',
        name: 'generateAnother',
        message: 'Would you like to generate another NPC?',
        default: false
    });

    if (generateAnother) {
        await generateNPC();
    }
};
