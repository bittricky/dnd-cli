import inquirer from "inquirer";
import chalk from "chalk";
import {
  INDIVIDUAL_TREASURE,
  HOARD_TREASURE,
  MAGIC_ITEM_TABLES,
  GEMS,
  ART_OBJECTS,
} from "../data/treasure.js";
import path from "path";
import fs from "fs-extra";

const rollDice = (diceString) => {
  const [count, sides] = diceString.split("d").map(Number);
  if (isNaN(count) || isNaN(sides) || count < 1 || sides < 1) {
    throw new Error(`Invalid dice string: ${diceString}`);
  }
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += Math.floor(Math.random() * sides) + 1;
  }
  return total;
};

const parseTreasureRoll = (diceString) => {
  if (!diceString.includes("×")) return rollDice(diceString);

  const [dice, multiplier] = diceString.split("×").map((s) => s.trim());
  if (isNaN(parseInt(multiplier))) {
    throw new Error(`Invalid multiplier in dice string: ${diceString}`);
  }
  return rollDice(dice) * parseInt(multiplier);
};

const getCRRange = (cr) => {
  if (typeof cr !== "number" && typeof cr !== "string") {
    throw new Error("CR must be a number or string");
  }
  const crNum = typeof cr === "string" ? eval(cr) : cr;
  if (crNum < 0 || crNum > 30) {
    throw new Error("CR must be between 0 and 30");
  }
  if (crNum <= 4) return "CR_0_4";
  if (crNum <= 10) return "CR_5_10";
  if (crNum <= 16) return "CR_11_16";
  return "CR_17_PLUS";
};

const rollOnTable = (table, roll) => {
  const entry = table.find(
    (entry) => roll >= entry.range[0] && roll <= entry.range[1],
  );
  if (!entry) {
    throw new Error(`No entry found for roll ${roll}`);
  }
  return entry;
};

const getRandomGem = (value) => {
  const gems = GEMS[value];
  if (!gems) {
    throw new Error(`No gems found for value ${value}`);
  }
  return gems[Math.floor(Math.random() * gems.length)];
};

const getRandomArtObject = (value) => {
  const artObjects = ART_OBJECTS[value];
  if (!artObjects) {
    throw new Error(`No art objects found for value ${value}`);
  }
  return artObjects[Math.floor(Math.random() * artObjects.length)];
};

export const rollTreasure = (cr) => {
  const range = getCRRange(cr);
  const table = INDIVIDUAL_TREASURE[range];
  const roll = Math.floor(Math.random() * 100) + 1;
  const result = rollOnTable(table, roll);

  const treasure = {
    copper: 0,
    silver: 0,
    electrum: 0,
    gold: 0,
    platinum: 0,
  };

  Object.entries(result.coins).forEach(([type, diceString]) => {
    treasure[
      type
        .replace("cp", "copper")
        .replace("sp", "silver")
        .replace("ep", "electrum")
        .replace("gp", "gold")
        .replace("pp", "platinum")
    ] = parseTreasureRoll(diceString);
  });

  return treasure;
};

export const calculateHoardValue = (hoard) => {
  return Math.floor(
    (hoard.copper || 0) / 100 +
      (hoard.silver || 0) / 10 +
      (hoard.electrum || 0) / 2 +
      (hoard.gold || 0) +
      (hoard.platinum || 0) * 10,
  );
};

export const generateMagicItems = (table, count) => {
  if (!MAGIC_ITEM_TABLES[table]) {
    throw new Error(`Invalid magic item table: ${table}`);
  }

  const items = [];
  for (let i = 0; i < count; i++) {
    const roll = Math.floor(Math.random() * 100) + 1;
    const entry = rollOnTable(MAGIC_ITEM_TABLES[table], roll);
    items.push(entry.item);
  }
  return items;
};

export const generateHoard = (cr) => {
  const range = getCRRange(cr);
  const table = HOARD_TREASURE[range];
  if (!table) {
    throw new Error(`No treasure table found for CR range ${range}`);
  }

  // Roll coins
  const coins = {
    copper: 0,
    silver: 0,
    electrum: 0,
    gold: 0,
    platinum: 0,
  };

  Object.entries(table.coins || {}).forEach(([type, diceString]) => {
    coins[
      type
        .replace("cp", "copper")
        .replace("sp", "silver")
        .replace("ep", "electrum")
        .replace("gp", "gold")
        .replace("pp", "platinum")
    ] = parseTreasureRoll(diceString);
  });

  // Roll for gems/art objects and magic items
  const roll = Math.floor(Math.random() * 100) + 1;
  const gemsArtResult = rollOnTable(table.gems_art, roll);

  const valuables = [];
  const magicItems = [];

  if (gemsArtResult.items) {
    for (const item of gemsArtResult.items) {
      const count = parseTreasureRoll(item.count || "1");
      for (let i = 0; i < count; i++) {
        const description =
          item.type === "gem"
            ? getRandomGem(item.value)
            : getRandomArtObject(item.value);
        valuables.push({
          type: item.type,
          value: item.value,
          description,
        });
      }
    }
  }

  // Handle magic items if they exist in the result
  if (gemsArtResult.magic_items) {
    for (const magicItem of gemsArtResult.magic_items) {
      const count = parseTreasureRoll(magicItem.count);
      magicItems.push(...generateMagicItems(magicItem.table, count));
    }
  }

  const totalValue =
    calculateHoardValue(coins) +
    valuables.reduce((sum, item) => sum + item.value, 0);

  return {
    coins,
    valuables,
    magicItems,
    totalValue,
  };
};

export const generateLoot = async () => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "treasureType",
      message: "What type of treasure would you like to generate?",
      choices: [
        { name: "Individual Treasure", value: "individual" },
        { name: "Treasure Hoard", value: "hoard" },
      ],
    },
    {
      type: "number",
      name: "count",
      message: "How many treasures would you like to generate?",
      default: 1,
      validate: (input) =>
        (input > 0 && input <= 100) ||
        "Please enter a number between 1 and 100",
    },
    {
      type: "input",
      name: "cr",
      message: "Enter the Challenge Rating (0-30):",
      validate: (input) => {
        const num = Number(input);
        return (
          (!isNaN(num) && num >= 0 && num <= 30) ||
          "Please enter a number between 0 and 30"
        );
      },
      filter: (input) => Number(input),
    },
    {
      type: "confirm",
      name: "useCustomTable",
      message: "Would you like to use a custom loot table?",
      default: false,
    },
    {
      type: "input",
      name: "customTablePath",
      message: "Enter the path to your custom loot table (JSON file):",
      when: (answers) => answers.useCustomTable,
      validate: async (input) => {
        try {
          await fs.access(input);
          const content = await fs.readFile(input, "utf8");
          JSON.parse(content);
          return true;
        } catch (error) {
          return "Please enter a valid path to a JSON file";
        }
      },
    },
  ]);

  let customTable;
  if (answers.useCustomTable) {
    const content = await fs.readFile(answers.customTablePath, "utf8");
    customTable = JSON.parse(content);
  }

  const results = [];
  for (let i = 0; i < answers.count; i++) {
    let loot;
    if (answers.treasureType === "individual") {
      loot = {
        coins: rollTreasure(answers.cr),
      };
    } else {
      loot = generateHoard(answers.cr);
    }
    results.push(loot);
  }

  // Display results
  results.forEach((loot, index) => {
    if (results.length > 1) {
      console.log(chalk.green(`\nTreasure #${index + 1}:`));
    }

    if (answers.treasureType === "individual") {
      console.log(chalk.green("\nIndividual Treasure:"));
      if (loot.coins.copper)
        console.log(chalk.yellow("Copper:"), loot.coins.copper);
      if (loot.coins.silver)
        console.log(chalk.white("Silver:"), loot.coins.silver);
      if (loot.coins.electrum)
        console.log(chalk.blue("Electrum:"), loot.coins.electrum);
      if (loot.coins.gold) console.log(chalk.yellow("Gold:"), loot.coins.gold);
      if (loot.coins.platinum)
        console.log(chalk.cyan("Platinum:"), loot.coins.platinum);
      console.log(
        chalk.green("\nTotal Value in Gold:"),
        calculateHoardValue(loot.coins),
      );
    } else {
      console.log(chalk.green("\nTreasure Hoard:"));
      console.log(chalk.yellow("\nCoins:"));
      if (loot.coins.copper)
        console.log(chalk.yellow("Copper:"), loot.coins.copper);
      if (loot.coins.silver)
        console.log(chalk.white("Silver:"), loot.coins.silver);
      if (loot.coins.electrum)
        console.log(chalk.blue("Electrum:"), loot.coins.electrum);
      if (loot.coins.gold) console.log(chalk.yellow("Gold:"), loot.coins.gold);
      if (loot.coins.platinum)
        console.log(chalk.cyan("Platinum:"), loot.coins.platinum);

      if (loot.valuables.length > 0) {
        console.log(chalk.yellow("\nGems and Art Objects:"));
        loot.valuables.forEach((item) => {
          console.log(
            `${chalk.blue(item.type === "gem" ? "Gem" : "Art Object")} (${item.value} gp):`,
            item.description,
          );
        });
      }

      if (loot.magicItems.length > 0) {
        console.log(chalk.yellow("\nMagic Items:"));
        loot.magicItems.forEach((item) => {
          console.log("-", item);
        });
      }

      console.log(chalk.green("\nTotal Hoard Value:"), loot.totalValue, "gp");
    }
  });

  const { saveFormat } = await inquirer.prompt({
    type: "list",
    name: "saveFormat",
    message: "How would you like to save the loot?",
    choices: [
      { name: "Text File (Human Readable)", value: "txt" },
      { name: "JSON File (Machine Readable)", value: "json" },
      { name: "Both Formats", value: "both" },
      { name: "Don't Save", value: "none" },
    ],
    default: "txt",
  });

  if (saveFormat !== "none") {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const baseFilename = `loot_${answers.treasureType}_cr${answers.cr}_${answers.count > 1 ? `x${answers.count}_` : ""}${timestamp}`;

    await fs.ensureDir(path.join(process.cwd(), "loot"));

    if (saveFormat === "txt" || saveFormat === "both") {
      const txtFilepath = path.join(
        process.cwd(),
        "loot",
        `${baseFilename}.txt`,
      );
      const txtContent = results
        .map((loot, index) => {
          if (answers.treasureType === "individual") {
            return `
D&D Individual Treasure ${results.length > 1 ? `#${index + 1}` : ""}
----------------------
Challenge Rating: ${answers.cr}

Coins:
${loot.coins.copper ? `Copper: ${loot.coins.copper}` : ""}
${loot.coins.silver ? `Silver: ${loot.coins.silver}` : ""}
${loot.coins.electrum ? `Electrum: ${loot.coins.electrum}` : ""}
${loot.coins.gold ? `Gold: ${loot.coins.gold}` : ""}
${loot.coins.platinum ? `Platinum: ${loot.coins.platinum}` : ""}

Total Value in Gold: ${calculateHoardValue(loot.coins)}
`;
          } else {
            return `
D&D Treasure Hoard ${results.length > 1 ? `#${index + 1}` : ""}
-----------------
Challenge Rating: ${answers.cr}

Coins:
${loot.coins.copper ? `Copper: ${loot.coins.copper}` : ""}
${loot.coins.silver ? `Silver: ${loot.coins.silver}` : ""}
${loot.coins.electrum ? `Electrum: ${loot.coins.electrum}` : ""}
${loot.coins.gold ? `Gold: ${loot.coins.gold}` : ""}
${loot.coins.platinum ? `Platinum: ${loot.coins.platinum}` : ""}

${
  loot.valuables.length > 0
    ? `Gems and Art Objects:
${loot.valuables.map((item) => `${item.type === "gem" ? "Gem" : "Art Object"} (${item.value} gp): ${item.description}`).join("\n")}`
    : ""
}

${
  loot.magicItems.length > 0
    ? `Magic Items:
${loot.magicItems.map((item) => `- ${item}`).join("\n")}`
    : ""
}

Total Hoard Value: ${loot.totalValue} gp
`;
          }
        })
        .join("\n---\n");

      await fs.writeFile(txtFilepath, txtContent.trim());
      console.log(chalk.green(`\nLoot saved to ${path.basename(txtFilepath)}`));
    }

    if (saveFormat === "json" || saveFormat === "both") {
      const jsonFilepath = path.join(
        process.cwd(),
        "loot",
        `${baseFilename}.json`,
      );
      const jsonContent = {
        metadata: {
          type: answers.treasureType,
          cr: answers.cr,
          count: answers.count,
          timestamp: new Date().toISOString(),
          customTable: answers.useCustomTable
            ? answers.customTablePath
            : undefined,
        },
        results,
      };

      await fs.writeFile(jsonFilepath, JSON.stringify(jsonContent, null, 2));
      console.log(
        chalk.green(`\nLoot saved to ${path.basename(jsonFilepath)}`),
      );
    }
  }

  const { generateAnother } = await inquirer.prompt({
    type: "confirm",
    name: "generateAnother",
    message: "Would you like to generate more loot?",
    default: false,
  });

  if (generateAnother) {
    await generateLoot();
  }

  return results;
};

export default generateLoot;
