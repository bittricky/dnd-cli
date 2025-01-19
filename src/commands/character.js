import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { RACES } from '../data/races.js';
import { CLASSES } from '../data/classes.js';
import { SOURCEBOOKS } from '../config/sourcebooks.js';

const getEnabledSourcebooks = () => {
	return Object.entries(SOURCEBOOKS)
		.filter(([_, book]) => book.enabled)
		.map(([key, _]) => key);
};

const getAvailableRaces = enabledBooks => {
	return Object.values(RACES)
		.filter(race => enabledBooks.includes(race.source))
		.map(race => ({
			name: `${race.name} (${race.source})`,
			value: race
		}));
};

const getAvailableClasses = enabledBooks => {
	return Object.values(CLASSES)
		.filter(cls => enabledBooks.includes(cls.source))
		.map(cls => ({
			name: `${cls.name} (${cls.source})`,
			value: cls
		}));
};

const getSubclassesForClass = (characterClass, enabledBooks) => {
	return Object.entries(characterClass.subclasses)
		.filter(([_, source]) => enabledBooks.includes(source))
		.map(([name, source]) => ({
			name: `${name} (${source})`,
			value: name
		}));
};

const rollAbilityScore = () => {
	const rolls = Array(4)
		.fill(0)
		.map(() => Math.floor(Math.random() * 6) + 1);
	return rolls
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce((sum, num) => sum + num, 0);
};

const generateStats = () => ({
	strength: rollAbilityScore(),
	dexterity: rollAbilityScore(),
	constitution: rollAbilityScore(),
	intelligence: rollAbilityScore(),
	wisdom: rollAbilityScore(),
	charisma: rollAbilityScore()
});

export const generateCharacter = async () => {
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
			message: 'Would you like to randomize all character attributes?',
			default: false
		},
		{
			type: 'input',
			name: 'name',
			message: 'Enter character name:',
			when: answers => !answers.randomize,
			validate: input => input.length > 0 || 'Name cannot be empty'
		},
		{
			type: 'list',
			name: 'race',
			message: 'Choose race:',
			choices: getAvailableRaces(enabledBooks),
			when: answers => !answers.randomize
		},
		{
			type: 'list',
			name: 'class',
			message: 'Choose class:',
			choices: getAvailableClasses(enabledBooks),
			when: answers => !answers.randomize
		},
		{
			type: 'list',
			name: 'subclass',
			message: answers => `Choose ${answers.class.name} subclass:`,
			choices: answers =>
				getSubclassesForClass(answers.class, enabledBooks),
			when: answers => !answers.randomize && answers.class
		}
	];

	let answers = await inquirer.prompt(questions);
	const stats = generateStats();

	if (answers.randomize) {
		const availableRaces = getAvailableRaces(enabledBooks);
		const availableClasses = getAvailableClasses(enabledBooks);
		const selectedClass =
			availableClasses[
				Math.floor(Math.random() * availableClasses.length)
			].value;
		const availableSubclasses = getSubclassesForClass(
			selectedClass,
			enabledBooks
		);

		answers = {
			name: 'Random_' + Math.floor(Math.random() * 1000),
			race: availableRaces[
				Math.floor(Math.random() * availableRaces.length)
			].value,
			class: selectedClass,
			subclass:
				availableSubclasses[
					Math.floor(Math.random() * availableSubclasses.length)
				].value
		};
	}

	const character = {
		...answers,
		stats,
		sourcebooks: enabledBooks
	};

	console.log(chalk.green('\nCharacter Generated!'));
	console.log(chalk.yellow('\nCharacter Details:'));
	console.log(chalk.blue('Name:'), character.name);
	console.log(
		chalk.blue('Race:'),
		`${character.race.name} (${character.race.source})`
	);
	console.log(
		chalk.blue('Class:'),
		`${character.class.name} (${character.class.source})`
	);
	console.log(chalk.blue('Subclass:'), character.subclass);

	console.log(chalk.blue('\nAbility Scores:'));
	Object.entries(character.stats).forEach(([ability, score]) => {
		const modifier = Math.floor((score - 10) / 2);
		console.log(
			chalk.blue(
				ability.charAt(0).toUpperCase() + ability.slice(1) + ':'
			),
			score,
			chalk.yellow(`(${modifier >= 0 ? '+' : ''}${modifier})`)
		);
	});

	const { saveCharacter } = await inquirer.prompt({
		type: 'confirm',
		name: 'saveCharacter',
		message: 'Would you like to save this character to a file?',
		default: true
	});

	if (saveCharacter) {
		const filename = `${character.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
		const filepath = path.join(process.cwd(), 'characters', filename);

		await fs.ensureDir(path.join(process.cwd(), 'characters'));

		const characterData = `
Dungeons and Dragons Character Sheet
------------------
Name: ${character.name}
Race: ${character.race.name} (${character.race.source})
Class: ${character.class.name} (${character.class.source})
Subclass: ${character.subclass}

Ability Scores
-------------
Strength: ${character.stats.strength} (${Math.floor((character.stats.strength - 10) / 2) >= 0 ? '+' : ''}${Math.floor((character.stats.strength - 10) / 2)})
Dexterity: ${character.stats.dexterity} (${Math.floor((character.stats.dexterity - 10) / 2) >= 0 ? '+' : ''}${Math.floor((character.stats.dexterity - 10) / 2)})
Constitution: ${character.stats.constitution} (${Math.floor((character.stats.constitution - 10) / 2) >= 0 ? '+' : ''}${Math.floor((character.stats.constitution - 10) / 2)})
Intelligence: ${character.stats.intelligence} (${Math.floor((character.stats.intelligence - 10) / 2) >= 0 ? '+' : ''}${Math.floor((character.stats.intelligence - 10) / 2)})
Wisdom: ${character.stats.wisdom} (${Math.floor((character.stats.wisdom - 10) / 2) >= 0 ? '+' : ''}${Math.floor((character.stats.wisdom - 10) / 2)})
Charisma: ${character.stats.charisma} (${Math.floor((character.stats.charisma - 10) / 2) >= 0 ? '+' : ''}${Math.floor((character.stats.charisma - 10) / 2)})

Sourcebooks Used
---------------
${character.sourcebooks.join(', ')}
`;

		await fs.writeFile(filepath, characterData);
		console.log(chalk.green(`\nCharacter saved to ${filename}`));
	}

	const { generateAnother } = await inquirer.prompt({
		type: 'confirm',
		name: 'generateAnother',
		message: 'Would you like to generate another character?',
		default: false
	});

	if (generateAnother) {
		await generateCharacter();
	}
};
