import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { RACES } from "../data/races.js";
import { CLASSES } from "../data/classes.js";
import { SOURCEBOOKS } from "../config/sourcebooks.js";

const getEnabledSourcebooks = () => {
  return Object.entries(SOURCEBOOKS)
    .filter(([_, book]) => book.enabled)
    .map(([key, _]) => key);
};

const getAvailableRaces = (enabledBooks) => {
  return Object.values(RACES)
    .filter((race) => enabledBooks.includes(race.source))
    .map((race) => ({
      name: `${race.name} (${race.source})`,
      value: race,
    }));
};

const getAvailableClasses = (enabledBooks) => {
  return Object.values(CLASSES)
    .filter((cls) => enabledBooks.includes(cls.source))
    .map((cls) => ({
      name: `${cls.name} (${cls.source})`,
      value: cls,
    }));
};

const getSubclassesForClass = (characterClass, enabledBooks) => {
  return Object.entries(characterClass.subclasses)
    .filter(([_, source]) => enabledBooks.includes(source))
    .map(([name, source]) => ({
      name: `${name} (${source})`,
      value: name,
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

export const rollAbilityScores = () => {
  return Array(6)
    .fill(0)
    .map(() => rollAbilityScore());
};

export const calculateModifier = (score) => {
  return Math.floor((score - 10) / 2);
};

export const calculateProficiencyBonus = (level) => {
  if (level < 1 || level > 20) {
    throw new Error("Level must be between 1 and 20");
  }
  return Math.floor((level - 1) / 4) + 2;
};

export const generateCharacterStats = () => {
  const abilityScores = rollAbilityScores();
  const modifiers = abilityScores.map(calculateModifier);

  return {
    abilityScores,
    modifiers,
    proficiencyBonus: calculateProficiencyBonus(1), // Start at level 1
    hitPoints: null, // Will be set based on class
    armorClass: 10 + modifiers[1], // Base AC + Dex modifier
    initiative: modifiers[1], // Dex modifier
    speed: null, // Will be set based on race
    savingThrows: [], // Will be set based on class
    skills: [], // Will be set based on background and class
    proficiencies: [], // Will be set based on race, class, and background
    languages: [], // Will be set based on race and background
  };
};

export const generateCharacter = async () => {
  const { configureSourcebooks } = await inquirer.prompt({
    type: "confirm",
    name: "configureSourcebooks",
    message: "Would you like to configure which sourcebooks to use?",
    default: false,
  });

  if (configureSourcebooks) {
    const { selectedBooks } = await inquirer.prompt({
      type: "checkbox",
      name: "selectedBooks",
      message: "Select which sourcebooks to enable:",
      choices: Object.values(SOURCEBOOKS).map((book) => ({
        name: book.name,
        value: book.abbreviation,
        checked: book.enabled,
      })),
      validate: (answer) => {
        if (answer.length < 1) {
          return "You must select at least one sourcebook!";
        }
        return true;
      },
    });

    Object.keys(SOURCEBOOKS).forEach((key) => {
      SOURCEBOOKS[key].enabled = selectedBooks.includes(key);
    });
  }

  const enabledBooks = getEnabledSourcebooks();

  const questions = [
    {
      type: "confirm",
      name: "randomize",
      message: "Would you like to randomize all character attributes?",
      default: false,
    },
    {
      type: "input",
      name: "name",
      message: "Enter character name:",
      when: (answers) => !answers.randomize,
      validate: (input) => input.length > 0 || "Name cannot be empty",
    },
    {
      type: "list",
      name: "race",
      message: "Choose race:",
      choices: getAvailableRaces(enabledBooks),
      when: (answers) => !answers.randomize,
    },
    {
      type: "list",
      name: "class",
      message: "Choose class:",
      choices: getAvailableClasses(enabledBooks),
      when: (answers) => !answers.randomize,
    },
    {
      type: "list",
      name: "subclass",
      message: (answers) => `Choose ${answers.class.name} subclass:`,
      choices: (answers) => getSubclassesForClass(answers.class, enabledBooks),
      when: (answers) => !answers.randomize && answers.class,
    },
  ];

  let answers = await inquirer.prompt(questions);
  const stats = generateCharacterStats();

  if (answers.randomize) {
    const availableRaces = getAvailableRaces(enabledBooks);
    const availableClasses = getAvailableClasses(enabledBooks);
    const selectedClass =
      availableClasses[Math.floor(Math.random() * availableClasses.length)]
        .value;
    const availableSubclasses = getSubclassesForClass(
      selectedClass,
      enabledBooks,
    );

    answers = {
      name: "Random_" + Math.floor(Math.random() * 1000),
      race: availableRaces[Math.floor(Math.random() * availableRaces.length)]
        .value,
      class: selectedClass,
      subclass:
        availableSubclasses[
          Math.floor(Math.random() * availableSubclasses.length)
        ].value,
    };
  }

  const character = {
    ...answers,
    stats,
    sourcebooks: enabledBooks,
  };

  console.log(chalk.green("\nCharacter Generated!"));
  console.log(chalk.yellow("\nCharacter Details:"));
  console.log(chalk.blue("Name:"), character.name);
  console.log(
    chalk.blue("Race:"),
    `${character.race.name} (${character.race.source})`,
  );
  console.log(
    chalk.blue("Class:"),
    `${character.class.name} (${character.class.source})`,
  );
  console.log(chalk.blue("Subclass:"), character.subclass);

  console.log(chalk.blue("\nAbility Scores:"));
  Object.entries(character.stats.abilityScores).forEach(([ability, score]) => {
    const modifier =
      character.stats.modifiers[
        Object.keys(character.stats.abilityScores).indexOf(ability)
      ];
    console.log(
      chalk.blue(ability.charAt(0).toUpperCase() + ability.slice(1) + ":"),
      score,
      chalk.yellow(`(${modifier >= 0 ? "+" : ""}${modifier})`),
    );
  });

  const { saveCharacter } = await inquirer.prompt({
    type: "confirm",
    name: "saveCharacter",
    message: "Would you like to save this character to a file?",
    default: true,
  });

  if (saveCharacter) {
    const filename = `${character.name.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`;
    const filepath = path.join(process.cwd(), "characters", filename);

    await fs.ensureDir(path.join(process.cwd(), "characters"));

    const characterData = `
Dungeons and Dragons Character Sheet
------------------
Name: ${character.name}
Race: ${character.race.name} (${character.race.source})
Class: ${character.class.name} (${character.class.source})
Subclass: ${character.subclass}

Ability Scores
-------------
Strength: ${character.stats.abilityScores.strength} (${character.stats.modifiers[0] >= 0 ? "+" : ""}${character.stats.modifiers[0]})
Dexterity: ${character.stats.abilityScores.dexterity} (${character.stats.modifiers[1] >= 0 ? "+" : ""}${character.stats.modifiers[1]})
Constitution: ${character.stats.abilityScores.constitution} (${character.stats.modifiers[2] >= 0 ? "+" : ""}${character.stats.modifiers[2]})
Intelligence: ${character.stats.abilityScores.intelligence} (${character.stats.modifiers[3] >= 0 ? "+" : ""}${character.stats.modifiers[3]})
Wisdom: ${character.stats.abilityScores.wisdom} (${character.stats.modifiers[4] >= 0 ? "+" : ""}${character.stats.modifiers[4]})
Charisma: ${character.stats.abilityScores.charisma} (${character.stats.modifiers[5] >= 0 ? "+" : ""}${character.stats.modifiers[5]})

Sourcebooks Used
---------------
${character.sourcebooks.join(", ")}
`;

    await fs.writeFile(filepath, characterData);
    console.log(chalk.green(`\nCharacter saved to ${filename}`));
  }

  const { generateAnother } = await inquirer.prompt({
    type: "confirm",
    name: "generateAnother",
    message: "Would you like to generate another character?",
    default: false,
  });

  if (generateAnother) {
    await generateCharacter();
  }
};
