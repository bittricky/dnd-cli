import inquirer from 'inquirer';
import chalk from 'chalk';
import { XP_THRESHOLDS, GROUP_SIZE_MULTIPLIERS, MONSTERS } from '../data/encounter.js';

export function calculateXPThresholds(level) {
    if (level < 1 || level > 20) {
        throw new Error('Level must be between 1 and 20');
    }
    return XP_THRESHOLDS[level];
}

export function adjustXPForGroupSize(baseXP, monsterCount) {
    if (monsterCount < 1) {
        throw new Error('Monster count must be at least 1');
    }
    const multiplier = monsterCount > 15 ? GROUP_SIZE_MULTIPLIERS[15] : GROUP_SIZE_MULTIPLIERS[monsterCount];
    return Math.floor(baseXP * multiplier);
}

export function calculateEncounterDifficulty(partyLevels, totalXP) {
    // Calculate party thresholds
    const partyThresholds = {
        easy: 0,
        medium: 0,
        hard: 0,
        deadly: 0
    };

    partyLevels.forEach(level => {
        const thresholds = calculateXPThresholds(level);
        partyThresholds.easy += thresholds.easy;
        partyThresholds.medium += thresholds.medium;
        partyThresholds.hard += thresholds.hard;
        partyThresholds.deadly += thresholds.deadly;
    });

    // For 4 level 1 characters:
    // easy = 100 (25 * 4)
    // medium = 200 (50 * 4)
    // hard = 300 (75 * 4)
    // deadly = 400 (100 * 4)
    
    if (totalXP === 0) return 'trivial';
    if (totalXP > partyThresholds.deadly) return 'deadly';
    if (totalXP === partyThresholds.deadly) return 'hard';
    if (totalXP >= partyThresholds.hard) return 'hard';
    if (totalXP >= partyThresholds.medium) return 'medium';
    if (totalXP >= partyThresholds.easy) return 'easy';
    return 'trivial';
}

export function generateEncounter(partyLevels, targetDifficulty) {
    if (!partyLevels || partyLevels.length === 0) {
        throw new Error('Party levels must be provided');
    }
    if (!['trivial', 'easy', 'medium', 'hard', 'deadly'].includes(targetDifficulty)) {
        throw new Error('Invalid difficulty specified');
    }

    // Calculate target XP thresholds for the party
    const partyThresholds = {
        easy: 0,
        medium: 0,
        hard: 0,
        deadly: 0
    };

    partyLevels.forEach(level => {
        if (level < 1 || level > 20) {
            throw new Error('Invalid party level');
        }
        const thresholds = calculateXPThresholds(level);
        partyThresholds.easy += thresholds.easy;
        partyThresholds.medium += thresholds.medium;
        partyThresholds.hard += thresholds.hard;
        partyThresholds.deadly += thresholds.deadly;
    });

    // Determine target XP range
    let minXP, maxXP;
    switch (targetDifficulty) {
        case 'trivial':
            minXP = 0;
            maxXP = partyThresholds.easy;
            break;
        case 'easy':
            minXP = partyThresholds.easy;
            maxXP = partyThresholds.medium;
            break;
        case 'medium':
            minXP = partyThresholds.medium;
            maxXP = partyThresholds.hard;
            break;
        case 'hard':
            minXP = partyThresholds.hard;
            maxXP = partyThresholds.deadly;
            break;
        case 'deadly':
            minXP = partyThresholds.deadly;
            maxXP = partyThresholds.deadly * 1.5;
            break;
    }

    // Generate encounter
    const selectedMonsters = [];
    let totalXP = 0;
    let attempts = 0;
    const maxAttempts = 100;

    while (attempts < maxAttempts) {
        const monster = MONSTERS[Math.floor(Math.random() * MONSTERS.length)];
        const potentialXP = totalXP + monster.xp;
        const adjustedXP = adjustXPForGroupSize(potentialXP, selectedMonsters.length + 1);

        if (adjustedXP >= minXP && adjustedXP <= maxXP) {
            selectedMonsters.push(monster);
            totalXP = potentialXP;
            break;
        }

        attempts++;
    }

    // If we couldn't find a perfect match, return what we have
    const adjustedXP = adjustXPForGroupSize(totalXP, selectedMonsters.length);
    const actualDifficulty = calculateEncounterDifficulty(partyLevels, adjustedXP);

    return {
        monsters: selectedMonsters,
        totalXP,
        adjustedXP,
        difficulty: actualDifficulty
    };
}

// Interactive encounter builder
export async function buildEncounter() {
    console.log(chalk.yellow('\nD&D 5E Encounter Builder'));
    console.log(chalk.gray('Build balanced encounters for your party'));

    // Get party size
    const { partySize } = await inquirer.prompt({
        type: 'number',
        name: 'partySize',
        message: 'How many players are in the party?',
        validate: value => {
            if (value < 1 || value > 10) return 'Please enter a number between 1 and 10';
            return true;
        }
    });

    // Get party levels
    const partyLevels = [];
    for (let i = 0; i < partySize; i++) {
        const { level } = await inquirer.prompt({
            type: 'number',
            name: 'level',
            message: `Enter level for player ${i + 1}:`,
            validate: value => {
                if (value < 1 || value > 20) return 'Please enter a level between 1 and 20';
                return true;
            }
        });
        partyLevels.push(level);
    }

    // Get desired difficulty
    const { difficulty } = await inquirer.prompt({
        type: 'list',
        name: 'difficulty',
        message: 'Select encounter difficulty:',
        choices: ['trivial', 'easy', 'medium', 'hard', 'deadly']
    });

    // Generate and display encounter
    const encounter = generateEncounter(partyLevels, difficulty);

    console.log('\nGenerated Encounter:');
    console.log('═'.repeat(40));
    
    encounter.monsters.forEach(monster => {
        console.log(chalk.cyan(`${monster.name} (CR ${monster.cr})`));
    });

    console.log('\nEncounter Stats:');
    console.log(chalk.gray(`Total XP: ${encounter.totalXP}`));
    console.log(chalk.gray(`Adjusted XP: ${encounter.adjustedXP}`));
    console.log(chalk.yellow(`Difficulty: ${encounter.difficulty}`));

    return encounter;
}
