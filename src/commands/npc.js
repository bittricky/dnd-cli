import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { NPC_TEMPLATES } from '../data/npc-templates.js';
import { SOURCEBOOKS } from '../config/sourcebooks.js';
import { NPC_TRAITS } from '../data/npc-traits.js';

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

export const generatePersonality = () => {
    const backgrounds = Object.keys(NPC_TRAITS.PERSONALITY);
    const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    const alignments = Object.keys(NPC_TRAITS.IDEALS);
    const alignment = alignments[Math.floor(Math.random() * alignments.length)];

    return {
        trait: NPC_TRAITS.PERSONALITY[background][Math.floor(Math.random() * NPC_TRAITS.PERSONALITY[background].length)],
        ideal: NPC_TRAITS.IDEALS[alignment][Math.floor(Math.random() * NPC_TRAITS.IDEALS[alignment].length)],
        bond: NPC_TRAITS.BONDS[Math.floor(Math.random() * NPC_TRAITS.BONDS.length)],
        flaw: NPC_TRAITS.FLAWS[Math.floor(Math.random() * NPC_TRAITS.FLAWS.length)]
    };
};

export const generateAppearance = (race = 'HUMAN') => {
    const heightCategory = NPC_TRAITS.APPEARANCE.HEIGHT[race.toUpperCase()] || NPC_TRAITS.APPEARANCE.HEIGHT.HUMAN;
    const height = heightCategory[Math.floor(Math.random() * heightCategory.length)];
    const build = NPC_TRAITS.APPEARANCE.BUILD[Math.floor(Math.random() * NPC_TRAITS.APPEARANCE.BUILD.length)];
    const features = NPC_TRAITS.APPEARANCE.FEATURES[Math.floor(Math.random() * NPC_TRAITS.APPEARANCE.FEATURES.length)];
    const clothing = NPC_TRAITS.APPEARANCE.CLOTHING[Math.floor(Math.random() * NPC_TRAITS.APPEARANCE.CLOTHING.length)];

    return {
        height,
        build,
        features,
        clothing,
        description: `A ${height}, ${build} ${race.toLowerCase()} with ${features}, wearing ${clothing}.`
    };
};

export const generateBackground = (location = null) => {
    const locations = Object.keys(NPC_TRAITS.OCCUPATIONS);
    const selectedLocation = location ? location.toUpperCase() : locations[Math.floor(Math.random() * locations.length)];

    if (!NPC_TRAITS.OCCUPATIONS[selectedLocation]) {
        throw new Error(`Invalid location: ${location}`);
    }

    const occupations = NPC_TRAITS.OCCUPATIONS[selectedLocation];
    const occupation = occupations[Math.floor(Math.random() * occupations.length)];

    return {
        location: selectedLocation.toLowerCase(),
        occupation,
        description: `A ${occupation.toLowerCase()} from a ${selectedLocation.toLowerCase()}.`
    };
};

export const generateMotivation = () => {
    const primary = NPC_TRAITS.MOTIVATIONS.PRIMARY[Math.floor(Math.random() * NPC_TRAITS.MOTIVATIONS.PRIMARY.length)];
    const secondary = NPC_TRAITS.MOTIVATIONS.SECONDARY[Math.floor(Math.random() * NPC_TRAITS.MOTIVATIONS.SECONDARY.length)];

    return {
        primary,
        secondary,
        description: `Motivated primarily by ${primary.toLowerCase()}, with a secondary desire to ${secondary.toLowerCase()}.`
    };
};

export const generateNPC = (options = {}) => {
    // Validate options
    if (options.race && !NPC_TRAITS.APPEARANCE.HEIGHT[options.race.toUpperCase()]) {
        throw new Error(`Invalid race: ${options.race}`);
    }
    if (options.gender && !['male', 'female', 'other'].includes(options.gender.toLowerCase())) {
        throw new Error(`Invalid gender: ${options.gender}`);
    }
    if (options.location && !NPC_TRAITS.OCCUPATIONS[options.location.toUpperCase()]) {
        throw new Error(`Invalid location: ${options.location}`);
    }

    const enabledBooks = getEnabledSourcebooks();
    const templates = getAvailableTemplates(enabledBooks);
    const template = options.template || templates[Math.floor(Math.random() * templates.length)].value;

    // Generate NPC components
    const personality = generatePersonality();
    const appearance = generateAppearance(options.race);
    const background = generateBackground(options.location);
    const motivation = generateMotivation();
    const stats = generateStats();

    const npc = {
        name: options.name || `NPC_${Math.floor(Math.random() * 1000)}`,
        race: options.race || appearance.race || 'human',
        gender: options.gender || ['male', 'female', 'other'][Math.floor(Math.random() * 3)],
        template,
        stats,
        personality,
        appearance,
        background,
        motivation,
        sourcebooks: enabledBooks
    };

    return npc;
};

export const generateNPCWithPrompts = async (options = {}) => {
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
            validate: answer => {
                if (answer.length < 1) {
                    return 'You must select at least one sourcebook!';
                }
                return true;
            }
        });

        Object.keys(SOURCEBOOKS).forEach(key => {
            SOURCEBOOKS[key].enabled = selectedBooks.includes(key);
        });
    }

    const npc = generateNPC(options);

    // Display NPC
    console.log(chalk.green('\nNPC Generated!'));
    console.log(chalk.yellow('\nBasic Information:'));
    console.log(chalk.blue('Name:'), npc.name);
    console.log(chalk.blue('Race:'), npc.race);
    console.log(chalk.blue('Gender:'), npc.gender);
    console.log(chalk.blue('Template:'), `${npc.template.name} (${npc.template.source} - CR ${npc.template.cr})`);

    console.log(chalk.yellow('\nAppearance:'));
    console.log(npc.appearance.description);

    console.log(chalk.yellow('\nPersonality:'));
    console.log(chalk.blue('Trait:'), npc.personality.trait);
    console.log(chalk.blue('Ideal:'), npc.personality.ideal);
    console.log(chalk.blue('Bond:'), npc.personality.bond);
    console.log(chalk.blue('Flaw:'), npc.personality.flaw);

    console.log(chalk.yellow('\nBackground:'));
    console.log(npc.background.description);

    console.log(chalk.yellow('\nMotivation:'));
    console.log(npc.motivation.description);

    console.log(chalk.yellow('\nAbility Scores:'));
    Object.entries(npc.stats).forEach(([ability, score]) => {
        const modifier = Math.floor((score - 10) / 2);
        console.log(
            chalk.blue(ability.charAt(0).toUpperCase() + ability.slice(1) + ':'),
            score,
            chalk.yellow(`(${modifier >= 0 ? '+' : ''}${modifier})`)
        );
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
Dungeons & Dragons NPC Sheet
------------------
Name: ${npc.name}
Race: ${npc.race}
Gender: ${npc.gender}
Template: ${npc.template.name} (${npc.template.source} - CR ${npc.template.cr})

Appearance
---------
${npc.appearance.description}

Personality
----------
Trait: ${npc.personality.trait}
Ideal: ${npc.personality.ideal}
Bond: ${npc.personality.bond}
Flaw: ${npc.personality.flaw}

Background
---------
${npc.background.description}

Motivation
---------
${npc.motivation.description}

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
        await generateNPCWithPrompts();
    }

    return npc;
};

export default generateNPCWithPrompts;
