import inquirer from 'inquirer';
import chalk from 'chalk';
import {
    generateCharacter,
    generateNPC,
    rollDice,
    generateLoot,
    trackInitiative,
    readTarokka,
    rollWildMagic,
    weather
} from './commands/index.js';

// Pure function to create menu choices
const createMenuChoices = () => [
    {
        name: 'Character Generator',
        value: 'character',
        description: 'Generate a new player character with random stats'
    },
    {
        name: 'NPC Generator',
        value: 'npc',
        description: 'Create a detailed NPC with personality and background'
    },
    {
        name: 'Dice Roller',
        value: 'dice',
        description: 'Roll any combination of dice with modifiers'
    },
    {
        name: 'Loot Generator',
        value: 'loot',
        description: 'Generate treasure hoards and magic items'
    },
    {
        name: 'Initiative Tracker',
        value: 'initiative',
        description: 'Track combat initiative and turns'
    },
    {
        name: 'Tarokka Reading',
        value: 'tarokka',
        description: 'Perform Tarokka deck readings'
    },
    {
        name: 'Wild Magic Effects',
        value: 'wildmagic',
        description: 'Generate Wild Magic Surge effects'
    },
    {
        name: 'Weather Generator',
        value: 'weather',
        description: 'Generate weather conditions for different climates'
    },
    {
        name: 'Exit',
        value: 'exit',
        description: 'Exit the application'
    }
];

// Pure function to format menu choices with descriptions
const formatMenuChoices = choices => 
    choices.map(c => ({
        name: `${c.name} - ${chalk.dim(c.description)}`,
        value: c.value
    }));

// Pure function to create menu prompt
const createMenuPrompt = choices => ({
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: formatMenuChoices(choices),
    pageSize: choices.length
});

// Pure function to get command handler
const getCommandHandler = choice => {
    const handlers = {
        'character': generateCharacter,
        'npc': generateNPC,
        'dice': rollDice,
        'loot': generateLoot,
        'initiative': trackInitiative,
        'tarokka': readTarokka,
        'wildmagic': rollWildMagic,
        'weather': weather,
        'exit': () => {
            console.log(chalk.yellow('\nThanks for using D&D CLI Tool!'));
            process.exit(0);
        }
    };
    return handlers[choice] || (() => console.log(chalk.red('Invalid command')));
};

// Main menu function
const mainMenu = async () => {
    while (true) {
        const choices = createMenuChoices();
        const prompt = createMenuPrompt(choices);
        const { choice } = await inquirer.prompt([prompt]);
        
        const handler = getCommandHandler(choice);
        await handler();
        
        if (choice !== 'exit') {
            console.log('\n' + '='.repeat(50) + '\n');
        }
    }
};

export default mainMenu;
