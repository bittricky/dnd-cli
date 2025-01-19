import inquirer from 'inquirer';
import chalk from 'chalk';
import {
    INDIVIDUAL_TREASURE,
    HOARD_TREASURE,
    MAGIC_ITEM_TABLES,
    SETTING_SPECIFIC_ITEMS,
    GEMS,
    ART_OBJECTS
} from '../data/treasure.js';
import { SOURCEBOOKS } from '../config/sourcebooks.js';

const getEnabledSourcebooks = () => {
    return Object.entries(SOURCEBOOKS)
        .filter(([_, book]) => book.enabled)
        .map(([key, _]) => key);
};

const rollDice = (diceString) => {
    const [count, sides] = diceString.split('d').map(Number);
    let total = 0;
    for (let i = 0; i < count; i++) {
        total += Math.floor(Math.random() * sides) + 1;
    }
    return total;
};

const parseTreasureRoll = (diceString) => {
    if (!diceString.includes('×')) return rollDice(diceString);
    
    const [dice, multiplier] = diceString.split('×').map(s => s.trim());
    return rollDice(dice) * parseInt(multiplier);
};

const getCRRange = (cr) => {
    const crNum = typeof cr === 'string' ? eval(cr) : cr;
    if (crNum <= 4) return 'CR_0_4';
    if (crNum <= 10) return 'CR_5_10';
    if (crNum <= 16) return 'CR_11_16';
    return 'CR_17_PLUS';
};

const rollOnTable = (table, roll) => {
    return table.find(entry => 
        roll >= entry.range[0] && roll <= entry.range[1]
    );
};

const getRandomGem = (value) => {
    const gems = GEMS[value];
    return gems[Math.floor(Math.random() * gems.length)];
};

const getRandomArtObject = (value) => {
    const artObjects = ART_OBJECTS[value];
    return artObjects[Math.floor(Math.random() * artObjects.length)];
};

const getSettingSpecificItems = (setting, count) => {
    const items = [];
    const settingItems = SETTING_SPECIFIC_ITEMS[setting];
    
    for (const category in settingItems) {
        const categoryItems = settingItems[category];
        for (let i = 0; i < count; i++) {
            const item = categoryItems[Math.floor(Math.random() * categoryItems.length)];
            items.push(item);
        }
    }
    
    return items;
};

export const generateLoot = async () => {
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

    // Get loot generation parameters
    const questions = [
        {
            type: 'list',
            name: 'treasureType',
            message: 'What type of treasure would you like to generate?',
            choices: [
                { name: 'Individual Treasure', value: 'individual' },
                { name: 'Treasure Hoard', value: 'hoard' }
            ]
        },
        {
            type: 'input',
            name: 'cr',
            message: 'Enter the Challenge Rating (CR) of the encounter:',
            validate: (value) => {
                if (value.includes('/')) {
                    const [num, den] = value.split('/');
                    return !isNaN(num) && !isNaN(den) || 'Please enter a valid CR';
                }
                return !isNaN(value) && value >= 0 || 'Please enter a valid CR';
            }
        },
        {
            type: 'confirm',
            name: 'includeSettingSpecific',
            message: 'Include setting-specific items?',
            default: false
        }
    ];

    let answers = await inquirer.prompt(questions);

    let settingSpecificItems = [];
    if (answers.includeSettingSpecific) {
        const { setting } = await inquirer.prompt({
            type: 'list',
            name: 'setting',
            message: 'Choose a campaign setting:',
            choices: [
                { name: 'Eberron', value: 'EBERRON' },
                { name: 'Ravenloft', value: 'RAVENLOFT' },
                { name: 'Theros', value: 'THEROS' }
            ]
        });
        settingSpecificItems = getSettingSpecificItems(setting, 1);
    }

    const crRange = getCRRange(answers.cr);
    const loot = { coins: {}, items: [], magic_items: [] };

    if (answers.treasureType === 'individual') {
        const roll = Math.floor(Math.random() * 100) + 1;
        const result = rollOnTable(INDIVIDUAL_TREASURE[crRange], roll);

        // Calculate coins
        for (const [currency, diceString] of Object.entries(result.coins)) {
            loot.coins[currency] = parseTreasureRoll(diceString);
        }
    } else {
        const hoardTable = HOARD_TREASURE[crRange];
        
        // Calculate coins
        for (const [currency, diceString] of Object.entries(hoardTable.coins)) {
            loot.coins[currency] = parseTreasureRoll(diceString);
        }

        // Roll for gems/art objects
        const gemsArtRoll = Math.floor(Math.random() * 100) + 1;
        const gemsArtResult = rollOnTable(hoardTable.gems_art, gemsArtRoll);

        if (gemsArtResult.items.length > 0) {
            for (const item of gemsArtResult.items) {
                const count = parseTreasureRoll(item.count);
                for (let i = 0; i < count; i++) {
                    if (item.type === 'gem') {
                        loot.items.push({
                            type: 'gem',
                            value: item.value,
                            description: getRandomGem(item.value)
                        });
                    } else {
                        loot.items.push({
                            type: 'art',
                            value: item.value,
                            description: getRandomArtObject(item.value)
                        });
                    }
                }
            }
        }

        // Add magic items if applicable
        if (hoardTable.magic_items_table) {
            const magicItemRoll = Math.floor(Math.random() * 100) + 1;
            const magicItem = rollOnTable(MAGIC_ITEM_TABLES[hoardTable.magic_items_table], magicItemRoll);
            if (magicItem) {
                loot.magic_items.push(magicItem);
            }
        }
    }

    // Add setting-specific items
    if (settingSpecificItems.length > 0) {
        loot.setting_specific = settingSpecificItems;
    }

    // Display results
    console.log(chalk.green('\nGenerated Loot:'));
    
    // Display coins
    console.log(chalk.yellow('\nCoins:'));
    for (const [currency, amount] of Object.entries(loot.coins)) {
        if (amount > 0) {
            console.log(`${amount} ${currency.toUpperCase()}`);
        }
    }

    // Display gems and art objects
    if (loot.items.length > 0) {
        console.log(chalk.yellow('\nGems and Art Objects:'));
        loot.items.forEach(item => {
            console.log(`${item.description} (${item.value} gp)`);
        });
    }

    // Display magic items
    if (loot.magic_items.length > 0) {
        console.log(chalk.yellow('\nMagic Items:'));
        loot.magic_items.forEach(item => {
            console.log(`${item.item} (${item.source})`);
        });
    }

    // Display setting-specific items
    if (loot.setting_specific) {
        console.log(chalk.yellow('\nSetting-Specific Items:'));
        loot.setting_specific.forEach(item => {
            console.log(`${item.name} (${item.source || item.rarity})`);
        });
    }

    const { generateAnother } = await inquirer.prompt({
        type: 'confirm',
        name: 'generateAnother',
        message: 'Would you like to generate more loot?',
        default: false
    });

    if (generateAnother) {
        await generateLoot();
    }
};
