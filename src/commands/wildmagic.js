import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { PHB_SURGE_TABLE, TASHAS_SURGE_TABLE } from "../data/wild-magic.js";

// Surge trigger types and their rules
export const SURGE_TRIGGERS = {
  STANDARD: {
    name: "Standard",
    description: "Surge on rolling a 1 on d20",
    threshold: 1,
  },
  ADVANTAGE: {
    name: "Advantage",
    description: "Roll twice and take the lower result",
    threshold: 1,
  },
  SPELL_LEVEL: {
    name: "Spell Level",
    description: "Surge chance equals spell level",
    threshold: null,
  },
  ESCALATING: {
    name: "Escalating",
    description: "Threshold increases by 1 until surge occurs",
    increment: 1,
  },
  CRITICAL: {
    name: "Critical",
    description: "Surge on rolling 1 or 20",
    threshold: [1, 20],
  },
};

export const createWildMagicState = () => ({
  surgeCount: 0,
  spellsCast: 0,
  currentThreshold: 1,
  triggerType: "STANDARD",
  activeTable: PHB_SURGE_TABLE,
  customTables: new Map(),
});

export const rollD20 = () => Math.floor(Math.random() * 20) + 1;
export const rollD100 = () => Math.floor(Math.random() * 100) + 1;

const resetState = (state) => ({
  ...state,
  surgeCount: 0,
  spellsCast: 0,
  currentThreshold: 1,
});

export const checkForSurge = (state, spellLevel = 1) => {
  const roll = rollD20();
  const spellsCast = state.spellsCast + 1;
  let currentThreshold = state.currentThreshold;
  let triggered = false;

  switch (state.triggerType) {
    case "STANDARD":
      triggered = roll <= SURGE_TRIGGERS.STANDARD.threshold;
      break;

    case "ESCALATING":
      if (roll <= currentThreshold) {
        currentThreshold = 1;
        triggered = true;
      } else {
        currentThreshold += SURGE_TRIGGERS.ESCALATING.increment;
        triggered = false;
      }
      break;

    case "SPELL_LEVEL":
      triggered = roll <= spellLevel;
      break;

    case "CRITICAL":
      triggered = SURGE_TRIGGERS.CRITICAL.threshold.includes(roll);
      break;

    default:
      triggered = false;
  }

  return {
    newState: {
      ...state,
      spellsCast,
      currentThreshold,
    },
    roll,
    triggered,
  };
};

export const getSurgeEffect = (state) => {
  const roll = rollD100();
  const effect = state.activeTable.find(
    (entry) => roll >= entry.range[0] && roll <= entry.range[1],
  );

  return {
    newState: {
      ...state,
      surgeCount: state.surgeCount + 1,
    },
    roll,
    effect,
  };
};

const saveCustomTable = async (state, tableName, effects) => {
  const tableData = {
    name: tableName,
    description: `Custom table: ${tableName}`,
    effects,
  };

  try {
    const savePath = path.join(
      process.cwd(),
      "custom-tables",
      `${tableName}.json`,
    );
    await fs.ensureDir(path.dirname(savePath));
    await fs.writeJson(savePath, tableData, { spaces: 2 });

    const newCustomTables = new Map(state.customTables);
    newCustomTables.set(tableName, effects);

    return {
      success: true,
      newState: {
        ...state,
        customTables: newCustomTables,
      },
    };
  } catch (error) {
    console.error("Error saving custom table:", error);
    return {
      success: false,
      newState: state,
    };
  }
};

const displaySurgeResult = (roll, effect, escalatingThreshold = null) => {
  console.log(chalk.red("\nWild Magic Surge triggered!"));
  console.log(chalk.yellow(`Roll: ${roll}`));
  console.log(chalk.green(`Effect: ${effect.effect}`));
  if (escalatingThreshold) {
    console.log(chalk.yellow(`Next surge threshold: ${escalatingThreshold}`));
  }
};

const displayNoSurge = (escalatingThreshold = null) => {
  console.log(chalk.blue("\nNo surge this time."));
  if (escalatingThreshold) {
    console.log(chalk.yellow(`Next surge threshold: ${escalatingThreshold}`));
  }
};

const displayStats = (state) => {
  console.log(chalk.yellow("\nWild Magic Statistics:"));
  console.log(chalk.green(`Spells Cast: ${state.spellsCast}`));
  console.log(chalk.green(`Surges Triggered: ${state.surgeCount}`));
  console.log(
    chalk.green(
      `Surge Rate: ${((state.surgeCount / state.spellsCast) * 100 || 0).toFixed(1)}%`,
    ),
  );
  console.log(
    chalk.green(
      `Current Trigger Method: ${SURGE_TRIGGERS[state.triggerType].name}`,
    ),
  );
  if (state.triggerType === "ESCALATING") {
    console.log(chalk.green(`Current Threshold: ${state.currentThreshold}`));
  }
};

export const rollWildMagic = async () => {
  let state = createWildMagicState();

  while (true) {
    const { action } = await inquirer.prompt({
      type: "list",
      name: "action",
      message: "Wild Magic Surge Menu:",
      choices: [
        { name: "Cast a Spell", value: "CAST" },
        { name: "Roll on Wild Magic Table", value: "ROLL" },
        { name: "Change Surge Trigger", value: "TRIGGER" },
        { name: "Change Wild Magic Table", value: "TABLE" },
        { name: "Create Custom Table", value: "CREATE" },
        { name: "View Statistics", value: "STATS" },
        { name: "Reset Tracker", value: "RESET" },
        { name: "Exit", value: "EXIT" },
      ],
    });

    switch (action) {
      case "CAST": {
        const { spellLevel } = await inquirer.prompt({
          type: "number",
          name: "spellLevel",
          message: "What level spell are you casting? (0 for cantrip):",
          validate: (value) => {
            return (
              (value >= 0 && value <= 9) ||
              "Please enter a valid spell level (0-9)"
            );
          },
        });

        if (spellLevel === 0 && state.triggerType !== "SPELL_LEVEL") {
          console.log(
            chalk.yellow("Cantrips don't trigger Wild Magic Surges."),
          );
          continue;
        }

        const { newState, roll, triggered } = checkForSurge(state, spellLevel);
        state = newState;

        if (triggered) {
          const surgeResult = getSurgeEffect(state);
          state = surgeResult.newState;
          displaySurgeResult(
            surgeResult.roll,
            surgeResult.effect,
            state.triggerType === "ESCALATING" ? state.currentThreshold : null,
          );
        } else {
          displayNoSurge(
            state.triggerType === "ESCALATING" ? state.currentThreshold : null,
          );
        }
        break;
      }

      case "ROLL": {
        const { newState, roll, effect } = getSurgeEffect(state);
        state = newState;
        console.log(chalk.yellow(`\nRoll: ${roll}`));
        console.log(chalk.green(`Effect: ${effect.effect}`));
        break;
      }

      case "TRIGGER": {
        const { trigger } = await inquirer.prompt({
          type: "list",
          name: "trigger",
          message: "Select surge trigger method:",
          choices: Object.entries(SURGE_TRIGGERS).map(([key, value]) => ({
            name: `${value.name} - ${value.description}`,
            value: key,
          })),
        });
        state = {
          ...resetState(state),
          triggerType: trigger,
        };
        console.log(
          chalk.green(
            `Surge trigger changed to: ${SURGE_TRIGGERS[trigger].name}`,
          ),
        );
        break;
      }

      case "TABLE": {
        const { table } = await inquirer.prompt({
          type: "list",
          name: "table",
          message: "Select Wild Magic table:",
          choices: [
            { name: "Player's Handbook", value: PHB_SURGE_TABLE },
            {
              name: "Tasha's Cauldron of Everything",
              value: TASHAS_SURGE_TABLE,
            },
            ...Array.from(state.customTables.entries()).map(
              ([name, table]) => ({
                name: `Custom: ${name}`,
                value: table,
              }),
            ),
          ],
        });
        state = {
          ...state,
          activeTable: table,
        };
        break;
      }

      case "CREATE": {
        const { tableName } = await inquirer.prompt({
          type: "input",
          name: "tableName",
          message: "Enter name for the new table:",
          validate: (value) => value.length > 0,
        });

        const effects = [];
        let addingEffects = true;
        let rangeStart = 1;

        while (addingEffects && rangeStart <= 100) {
          const { effect } = await inquirer.prompt({
            type: "input",
            name: "effect",
            message: `Enter effect for range ${rangeStart}-${Math.min(rangeStart + 9, 100)}:`,
            validate: (value) => value.length > 0,
          });

          effects.push({
            range: [rangeStart, Math.min(rangeStart + 9, 100)],
            effect,
          });

          rangeStart += 10;
          if (rangeStart > 100) {
            addingEffects = false;
          } else {
            const { continue: shouldContinue } = await inquirer.prompt({
              type: "confirm",
              name: "continue",
              message: "Add another effect?",
              default: true,
            });
            addingEffects = shouldContinue;
          }
        }

        const { success, newState } = await saveCustomTable(
          state,
          tableName,
          effects,
        );
        state = newState;
        if (success) {
          console.log(chalk.green("Custom table created successfully!"));
        }
        break;
      }

      case "STATS":
        displayStats(state);
        break;

      case "RESET":
        state = resetState(state);
        console.log(chalk.green("Tracker reset."));
        break;

      case "EXIT":
        return;
    }
  }
};
