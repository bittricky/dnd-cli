import inquirer from "inquirer";
import chalk from "chalk";

export const rollDie = (sides) => {
  if (sides <= 1) {
    throw new Error("Invalid number of sides");
  }
  return Math.floor(Math.random() * sides) + 1;
};

export const parseRollString = (input) => {
  if (!input || typeof input !== "string") {
    throw new Error("Invalid roll string format");
  }

  if (input.includes("adv") && input.includes("dis")) {
    throw new Error("Cannot have both advantage and disadvantage");
  }

  const simplePattern = /^(\d+)d(\d+)(adv|dis)?([+-]\d+)?$/;
  const dicePartPattern = /(\d+)d(\d+)(adv|dis)?/;
  const modifierPattern = /[+-]\d+(?!d\d+)/g;

  if (
    input.includes("+d") ||
    input.includes("-d") ||
    input.match(/\d+d\d+[+-]\d+d/)
  ) {
    const rolls = [];
    let lastModifier = 0;
    let currentPart = input;

    while (currentPart.includes("d")) {
      const diceMatch = currentPart.match(dicePartPattern);
      if (!diceMatch) break;

      const [fullMatch, count, sides, advantage] = diceMatch;
      const diceIndex = currentPart.indexOf(fullMatch);
      const nextOperatorIndex = currentPart
        .slice(diceIndex + fullMatch.length)
        .search(/[+-]/);

      let modifier = 0;
      if (nextOperatorIndex !== -1) {
        const endIndex = nextOperatorIndex + diceIndex + fullMatch.length;
        const modifierStr = currentPart.slice(
          diceIndex + fullMatch.length,
          endIndex,
        );
        if (modifierStr.match(modifierPattern)) {
          modifier = parseInt(modifierStr);
        }
        currentPart =
          currentPart.slice(0, diceIndex) + currentPart.slice(endIndex);
      } else {
        const modifierStr = currentPart.slice(diceIndex + fullMatch.length);
        if (modifierStr.match(modifierPattern)) {
          modifier = parseInt(modifierStr);
        }
        currentPart = currentPart.slice(0, diceIndex);
      }

      rolls.push({
        count: parseInt(count),
        sides: parseInt(sides),
        modifier,
        advantage: advantage === "adv",
        disadvantage: advantage === "dis",
      });
    }

    const remainingModifiers = currentPart.match(modifierPattern);
    if (remainingModifiers) {
      lastModifier = remainingModifiers.reduce(
        (sum, mod) => sum + parseInt(mod),
        0,
      );
    }

    if (rolls.length === 0) {
      throw new Error("Invalid roll string format");
    }

    if (lastModifier !== 0) {
      rolls[rolls.length - 1].modifier = lastModifier;
    }

    return rolls;
  }

  const match = input.match(simplePattern);
  if (!match) {
    throw new Error("Invalid roll string format");
  }

  const [, count, sides, advantage, modifierStr] = match;
  const modifier = modifierStr ? parseInt(modifierStr) : 0;

  return {
    count: parseInt(count),
    sides: parseInt(sides),
    modifier,
    advantage: advantage === "adv",
    disadvantage: advantage === "dis",
  };
};

export const rollDiceWithModifier = (count, sides, modifier = 0) => {
  const rolls = Array.from({ length: count }, () => rollDie(sides));
  return {
    rolls,
    total: rolls.reduce((sum, roll) => sum + roll, 0) + modifier,
    modifier,
  };
};

export const rollWithAdvantage = (modifier = 0) => {
  const roll1 = rollDie(20);
  const roll2 = rollDie(20);
  return {
    rolls: [roll1, roll2],
    total: Math.max(roll1, roll2) + modifier,
    advantage: true,
    modifier,
  };
};

export const rollWithDisadvantage = (modifier = 0) => {
  const roll1 = rollDie(20);
  const roll2 = rollDie(20);
  return {
    rolls: [roll1, roll2],
    total: Math.min(roll1, roll2) + modifier,
    disadvantage: true,
    modifier,
  };
};

const formatRollResult = (result) => {
  const rollsStr = chalk.yellow(result.rolls.join(", "));
  const totalStr = chalk.green(result.total);
  const modifierStr = result.modifier
    ? chalk.blue(` (${result.modifier >= 0 ? "+" : ""}${result.modifier})`)
    : "";
  const advantageStr = result.advantage
    ? chalk.cyan(" with advantage")
    : result.disadvantage
      ? chalk.cyan(" with disadvantage")
      : "";

  return `Rolls: [${rollsStr}]${modifierStr}${advantageStr}\nTotal: ${totalStr}`;
};

export const rollDice = async () => {
  while (true) {
    const { rollString } = await inquirer.prompt({
      type: "input",
      name: "rollString",
      message: "Enter roll (e.g., 2d6+3, 1d20adv, 2d6+1d4+3):",
      validate: (input) => {
        try {
          parseRollString(input);
          return true;
        } catch (error) {
          return error.message;
        }
      },
    });

    try {
      const parsed = parseRollString(rollString);

      if (Array.isArray(parsed)) {
        let total = 0;
        parsed.forEach((roll) => {
          const result = roll.advantage
            ? rollWithAdvantage(roll.modifier)
            : roll.disadvantage
              ? rollWithDisadvantage(roll.modifier)
              : rollDiceWithModifier(roll.count, roll.sides, roll.modifier);
          console.log(chalk.blue(`\nRolling ${roll.count}d${roll.sides}...`));
          console.log(formatRollResult(result));
          total += result.total;
        });
        console.log(chalk.green(`\nGrand Total: ${total}`));
      } else {
        const result = parsed.advantage
          ? rollWithAdvantage(parsed.modifier)
          : parsed.disadvantage
            ? rollWithDisadvantage(parsed.modifier)
            : rollDiceWithModifier(parsed.count, parsed.sides, parsed.modifier);
        console.log(chalk.blue(`\nRolling ${parsed.count}d${parsed.sides}...`));
        console.log(formatRollResult(result));
      }
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
    }

    const { rollAgain } = await inquirer.prompt({
      type: "confirm",
      name: "rollAgain",
      message: "Would you like to roll again?",
      default: false,
    });

    if (!rollAgain) break;
    console.log("\n" + "=".repeat(50) + "\n");
  }
};
