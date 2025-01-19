import inquirer from 'inquirer';
import chalk from 'chalk';

const rollDie = (sides) => {
    return Math.floor(Math.random() * sides) + 1;
};

export const rollDice = async () => {
    const questions = [
        {
            type: 'input',
            name: 'numberOfDice',
            message: 'How many dice would you like to roll?',
            validate: (value) => {
                const valid = !isNaN(value) && parseInt(value) > 0;
                return valid || 'Please enter a valid number greater than 0';
            },
            filter: (value) => parseInt(value)
        },
        {
            type: 'list',
            name: 'sides',
            message: 'How many sides should each die have?',
            choices: ['4', '6', '8', '10', '12', '20', '100'],
            filter: (value) => parseInt(value)
        }
    ];

    const { numberOfDice, sides } = await inquirer.prompt(questions);
    
    console.log(chalk.blue('\nRolling ' + numberOfDice + 'd' + sides + '...'));
    
    const rolls = [];
    let total = 0;
    
    for (let i = 0; i < numberOfDice; i++) {
        const roll = rollDie(sides);
        rolls.push(roll);
        total += roll;
    }
    
    console.log(chalk.green('\nResults:'));
    console.log('Individual rolls:', chalk.yellow(rolls.join(', ')));
    console.log('Total:', chalk.yellow(total));
    
    const { rollAgain } = await inquirer.prompt({
        type: 'confirm',
        name: 'rollAgain',
        message: 'Would you like to roll again?',
        default: false
    });
    
    if (rollAgain) {
        await rollDice();
    }
};
