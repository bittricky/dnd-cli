import inquirer from 'inquirer';
import chalk from 'chalk';
import { HIGH_DECK, COMMON_DECK, READING_POSITIONS } from '../data/tarokka.js';

// Pure function to create a new deck state
const createDeckState = () => ({
    highDeck: [...HIGH_DECK],
    commonDeck: {
        SWORDS: [...COMMON_DECK.SWORDS],
        COINS: [...COMMON_DECK.COINS],
        STARS: [...COMMON_DECK.STARS],
        GLYPHS: [...COMMON_DECK.GLYPHS]
    }
});

// Pure function to shuffle an array
const shuffleArray = arr => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

// Pure function to shuffle deck
const shuffleDeck = deck => ({
    highDeck: shuffleArray(deck.highDeck),
    commonDeck: Object.fromEntries(
        Object.entries(deck.commonDeck)
            .map(([suit, cards]) => [suit, shuffleArray(cards)])
    )
});

// Pure functions to draw cards
const drawHighCard = deck => ({
    card: deck.highDeck[deck.highDeck.length - 1],
    newDeck: {
        ...deck,
        highDeck: deck.highDeck.slice(0, -1)
    }
});

const drawCommonCard = (deck, suit) => ({
    card: deck.commonDeck[suit][deck.commonDeck[suit].length - 1],
    newDeck: {
        ...deck,
        commonDeck: {
            ...deck.commonDeck,
            [suit]: deck.commonDeck[suit].slice(0, -1)
        }
    }
});

const drawRandomCommonCard = deck => {
    const suits = Object.keys(deck.commonDeck);
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const { card, newDeck } = drawCommonCard(deck, randomSuit);
    return {
        card: { suit: randomSuit, card },
        newDeck
    };
};

// Pure function to display a card
const displayCard = (card, isHigh = true) => {
    if (isHigh) {
        console.log(chalk.green(`\nThe ${card.name} - "${card.symbol}"`));
        console.log(chalk.blue(card.meaning));
        console.log(chalk.gray(card.description));
    } else {
        console.log(chalk.green(`\nThe ${card.card.name} of ${card.suit}`));
        console.log(chalk.blue(card.card.meaning));
    }
};

// Function to perform a single reading
const performReading = async (deck, position, isHigh = true) => {
    console.log(chalk.yellow(`\n${READING_POSITIONS[position].question}`));
    
    const { card, newDeck } = isHigh 
        ? drawHighCard(deck)
        : drawRandomCommonCard(deck);
    
    displayCard(card, isHigh);
    return newDeck;
};

// Function to perform a three-card spread
const performThreeCardSpread = async (deck, positions) => {
    console.log(chalk.magenta('\nDrawing three cards for your reading...'));
    
    let currentDeck = deck;
    for (const position of positions) {
        console.log(chalk.yellow(`\n${position}:`));
        const { card, newDeck } = drawHighCard(currentDeck);
        displayCard(card, true);
        currentDeck = newDeck;
    }
    return currentDeck;
};

// Main reading function
export const readTarokka = async () => {
    console.log(chalk.yellow('\nWelcome to the Tarokka Reading'));
    console.log(chalk.gray('The cards will tell us where to find that which you seek...'));

    const { readingType } = await inquirer.prompt({
        type: 'list',
        name: 'readingType',
        message: 'Choose your reading type:',
        choices: [
            { name: 'Full Reading (Curse of Strahd)', value: 'FULL' },
            { name: 'Single Card Reading', value: 'SINGLE' },
            { name: 'Three Card Reading', value: 'THREE' }
        ]
    });

    let deck = shuffleDeck(createDeckState());

    switch (readingType) {
        case 'FULL':
            console.log(chalk.magenta('\nPerforming the full reading for Curse of Strahd...'));
            
            // Draw three cards from the common deck
            deck = await performReading(deck, 'TOME_OF_STRAHD', false);
            deck = await performReading(deck, 'HOLY_SYMBOL', false);
            deck = await performReading(deck, 'SUNSWORD', false);
            
            // Draw two cards from the high deck
            deck = await performReading(deck, 'ALLY', true);
            deck = await performReading(deck, 'ENEMY', true);
            break;

        case 'SINGLE':
            const { cardType } = await inquirer.prompt({
                type: 'list',
                name: 'cardType',
                message: 'Choose card type:',
                choices: [
                    { name: 'High Card', value: 'HIGH' },
                    { name: 'Common Card', value: 'COMMON' }
                ]
            });

            if (cardType === 'HIGH') {
                const { card, newDeck } = drawHighCard(deck);
                displayCard(card, true);
                deck = newDeck;
            } else {
                const { suit } = await inquirer.prompt({
                    type: 'list',
                    name: 'suit',
                    message: 'Choose a suit:',
                    choices: Object.keys(COMMON_DECK)
                });

                const { card, newDeck } = drawCommonCard(deck, suit);
                displayCard({ suit, card: card }, false);
                deck = newDeck;
            }
            break;

        case 'THREE':
            const { spreadType } = await inquirer.prompt({
                type: 'list',
                name: 'spreadType',
                message: 'Choose spread type:',
                choices: [
                    { name: 'Past, Present, Future', value: 'TIME' },
                    { name: 'Mind, Body, Spirit', value: 'ASPECT' },
                    { name: 'Problem, Path, Potential', value: 'SOLUTION' }
                ]
            });

            const positions = {
                TIME: ['Past', 'Present', 'Future'],
                ASPECT: ['Mind', 'Body', 'Spirit'],
                SOLUTION: ['Problem', 'Path', 'Potential']
            };

            deck = await performThreeCardSpread(deck, positions[spreadType]);
            break;
    }

    const { readAgain } = await inquirer.prompt({
        type: 'confirm',
        name: 'readAgain',
        message: 'Would you like another reading?',
        default: false
    });

    if (readAgain) {
        await readTarokka();
    }
};
