import inquirer from "inquirer";
import chalk from "chalk";

// Initiative variants
export const INITIATIVE_VARIANTS = {
  STANDARD: {
    name: "Standard (d20 + DEX)",
    description: "Roll d20 and add Dexterity modifier",
  },
  ADVANTAGE: {
    name: "Advantage",
    description: "Roll 2d20 and take the higher roll (Alert feat, etc.)",
  },
  GROUP: {
    name: "Group Initiative",
    description: "Roll once for each type of creature",
  },
  SPEED_FACTOR: {
    name: "Speed Factor",
    description:
      "Modified initiative based on action type and weapon size (DMG variant)",
  },
};

// Speed factor modifiers
export const SPEED_FACTOR_MODIFIERS = {
  WEAPON_SIZE: {
    LIGHT: 2,
    NORMAL: 0,
    HEAVY: -2,
    RANGED: -5,
  },
  ACTION_TYPE: {
    MELEE: 0,
    RANGED: -2,
    SPELL: {
      CANTRIP: 0,
      LEVEL_1: -1,
      LEVEL_2: -2,
      LEVEL_3: -3,
      LEVEL_4: -4,
      LEVEL_5: -5,
      LEVEL_6: -6,
      LEVEL_7: -7,
      LEVEL_8: -8,
      LEVEL_9: -9,
    },
  },
};

export const rollD20 = () => Math.floor(Math.random() * 20) + 1;

export const rollInitiative = (dexMod = 0, advantage = false) => {
  if (advantage) {
    const roll1 = rollD20();
    const roll2 = rollD20();
    return Math.max(roll1, roll2) + dexMod;
  }
  return rollD20() + dexMod;
};

export const rollSpeedFactorInitiative = (
  dexMod,
  weaponSize,
  actionType,
  spellLevel = null,
) => {
  const baseRoll = rollD20();
  const weaponMod = SPEED_FACTOR_MODIFIERS.WEAPON_SIZE[weaponSize] || 0;
  let actionMod = 0;

  if (actionType === "SPELL" && spellLevel !== null) {
    actionMod =
      SPEED_FACTOR_MODIFIERS.ACTION_TYPE.SPELL[`LEVEL_${spellLevel}`] || 0;
  } else {
    actionMod = SPEED_FACTOR_MODIFIERS.ACTION_TYPE[actionType] || 0;
  }

  return baseRoll + dexMod + weaponMod + actionMod;
};

export const createCombatant = (name, initiative, dexMod = 0, type = "PC") => ({
  name,
  initiative,
  dexMod,
  type,
  conditions: [],
});

export const createCombatState = (variant = "STANDARD") => ({
  variant,
  combatants: [],
  round: 1,
  currentTurn: 0,
});

export const sortCombatants = (combatants) => {
  return [...combatants].sort((a, b) => {
    if (a.initiative === b.initiative) {
      return b.dexMod - a.dexMod;
    }
    return b.initiative - a.initiative;
  });
};

export const addCombatant = (state, combatant) => {
  const newCombatants = [...state.combatants, combatant];
  return {
    newState: {
      ...state,
      combatants: sortCombatants(newCombatants),
    },
  };
};

export const removeCombatant = (state, name) => {
  const newCombatants = state.combatants.filter((c) => c.name !== name);
  return {
    newState: {
      ...state,
      combatants: newCombatants,
      currentTurn:
        state.currentTurn >= newCombatants.length ? 0 : state.currentTurn,
    },
  };
};

export const nextTurn = (state) => {
  const nextTurn = state.currentTurn + 1;
  const newRound = nextTurn >= state.combatants.length;

  return {
    newState: {
      ...state,
      currentTurn: newRound ? 0 : nextTurn,
      round: newRound ? state.round + 1 : state.round,
    },
  };
};

export const addCondition = (
  state,
  combatantName,
  conditionName,
  duration = null,
) => {
  const newCombatants = state.combatants.map((c) => {
    if (c.name === combatantName) {
      return {
        ...c,
        conditions: [...c.conditions, { name: conditionName, duration }],
      };
    }
    return c;
  });

  return {
    newState: {
      ...state,
      combatants: newCombatants,
    },
  };
};

export const removeCondition = (state, combatantName, conditionName) => {
  const newCombatants = state.combatants.map((c) => {
    if (c.name === combatantName) {
      return {
        ...c,
        conditions: c.conditions.filter((cond) => cond.name !== conditionName),
      };
    }
    return c;
  });

  return {
    newState: {
      ...state,
      combatants: newCombatants,
    },
  };
};

export const updateConditions = (state) => {
  const newCombatants = state.combatants.map((c) => ({
    ...c,
    conditions: c.conditions
      .map((cond) => ({
        ...cond,
        duration: cond.duration === null ? null : cond.duration - 1,
      }))
      .filter((cond) => cond.duration === null || cond.duration > 0),
  }));

  return {
    newState: {
      ...state,
      combatants: newCombatants,
    },
  };
};

const formatCombatant = (combatant, isActive = false) => {
  const name = isActive ? chalk.green(combatant.name) : combatant.name;
  const initiative = chalk.yellow(combatant.initiative);
  const conditions = combatant.conditions
    .map((c) => `${c.name}${c.duration ? ` (${c.duration})` : ""}`)
    .join(", ");

  return `${name} (${initiative})${conditions ? ` - ${chalk.red(conditions)}` : ""}`;
};

export const trackInitiative = async () => {
  let state = createCombatState();

  const { variant } = await inquirer.prompt({
    type: "list",
    name: "variant",
    message: "Select initiative variant:",
    choices: Object.entries(INITIATIVE_VARIANTS).map(([key, value]) => ({
      name: `${value.name} - ${value.description}`,
      value: key,
    })),
  });

  state.variant = variant;

  while (true) {
    console.log(chalk.blue("\n=== Round", state.round, "==="));
    state.combatants.forEach((c, i) => {
      console.log(formatCombatant(c, i === state.currentTurn));
    });

    const { action } = await inquirer.prompt({
      type: "list",
      name: "action",
      message: "Select action:",
      choices: [
        { name: "Add Combatant", value: "ADD" },
        { name: "Remove Combatant", value: "REMOVE" },
        { name: "Next Turn", value: "NEXT" },
        { name: "Add Condition", value: "CONDITION" },
        { name: "End Combat", value: "END" },
      ],
    });

    if (action === "END") break;

    switch (action) {
      case "ADD": {
        const { name, dexMod, type } = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "Enter combatant name:",
          },
          {
            type: "number",
            name: "dexMod",
            message: "Enter DEX modifier:",
            default: 0,
          },
          {
            type: "list",
            name: "type",
            message: "Select combatant type:",
            choices: ["PC", "NPC", "Monster"],
          },
        ]);

        let initiative;
        if (variant === "SPEED_FACTOR") {
          const { weaponSize, actionType, spellLevel } = await inquirer.prompt([
            {
              type: "list",
              name: "weaponSize",
              message: "Select weapon size:",
              choices: Object.keys(SPEED_FACTOR_MODIFIERS.WEAPON_SIZE),
            },
            {
              type: "list",
              name: "actionType",
              message: "Select action type:",
              choices: Object.keys(SPEED_FACTOR_MODIFIERS.ACTION_TYPE),
            },
            {
              type: "list",
              name: "spellLevel",
              message: "Select spell level (if casting):",
              choices: ["None", ...Array(10).keys()],
              when: (answers) => answers.actionType === "SPELL",
            },
          ]);

          initiative = rollSpeedFactorInitiative(
            dexMod,
            weaponSize,
            actionType,
            spellLevel === "None" ? null : spellLevel,
          );
        } else {
          const { hasAdvantage } = await inquirer.prompt({
            type: "confirm",
            name: "hasAdvantage",
            message: "Roll with advantage?",
            default: false,
            when: () => variant === "ADVANTAGE",
          });

          initiative = rollInitiative(dexMod, hasAdvantage || false);
        }

        const { newState } = addCombatant(
          state,
          createCombatant(name, initiative, dexMod, type),
        );
        state = newState;
        break;
      }

      case "REMOVE": {
        const { name } = await inquirer.prompt({
          type: "list",
          name: "name",
          message: "Select combatant to remove:",
          choices: state.combatants.map((c) => c.name),
        });

        const { newState } = removeCombatant(state, name);
        state = newState;
        break;
      }

      case "NEXT": {
        const { newState } = nextTurn(state);
        state = updateConditions(newState).newState;
        break;
      }

      case "CONDITION": {
        const { combatant, condition, duration } = await inquirer.prompt([
          {
            type: "list",
            name: "combatant",
            message: "Select combatant:",
            choices: state.combatants.map((c) => c.name),
          },
          {
            type: "input",
            name: "condition",
            message: "Enter condition name:",
          },
          {
            type: "input",
            name: "duration",
            message: "Enter duration (rounds, leave empty for permanent):",
            filter: (input) => (input === "" ? null : parseInt(input)),
          },
        ]);

        const { newState } = addCondition(
          state,
          combatant,
          condition,
          duration,
        );
        state = newState;
        break;
      }
    }
  }
};
