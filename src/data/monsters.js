// XP by CR table
export const CR_TO_XP = {
    '0': 10,
    '1/8': 25,
    '1/4': 50,
    '1/2': 100,
    '1': 200,
    '2': 450,
    '3': 700,
    '4': 1100,
    '5': 1800,
    '6': 2300,
    '7': 2900,
    '8': 3900,
    '9': 5000,
    '10': 5900,
    '11': 7200,
    '12': 8400,
    '13': 10000,
    '14': 11500,
    '15': 13000,
    '16': 15000,
    '17': 18000,
    '18': 20000,
    '19': 22000,
    '20': 25000,
    '21': 33000,
    '22': 41000,
    '23': 50000,
    '24': 62000,
    '25': 75000,
    '26': 90000,
    '27': 105000,
    '28': 120000,
    '29': 135000,
    '30': 155000
};

// Encounter multipliers based on number of monsters
export const ENCOUNTER_MULTIPLIERS = {
    1: 1,
    2: 1.5,
    '3-6': 2,
    '7-10': 2.5,
    '11-14': 3,
    '15+': 4
};

// Difficulty thresholds by character level
export const DIFFICULTY_THRESHOLDS = {
    1: { easy: 25, medium: 50, hard: 75, deadly: 100 },
    2: { easy: 50, medium: 100, hard: 150, deadly: 200 },
    3: { easy: 75, medium: 150, hard: 225, deadly: 400 },
    4: { easy: 125, medium: 250, hard: 375, deadly: 500 },
    5: { easy: 250, medium: 500, hard: 750, deadly: 1100 },
    6: { easy: 300, medium: 600, hard: 900, deadly: 1400 },
    7: { easy: 350, medium: 750, hard: 1100, deadly: 1700 },
    8: { easy: 450, medium: 900, hard: 1400, deadly: 2100 },
    9: { easy: 550, medium: 1100, hard: 1600, deadly: 2400 },
    10: { easy: 600, medium: 1200, hard: 1900, deadly: 2800 },
    11: { easy: 800, medium: 1600, hard: 2400, deadly: 3600 },
    12: { easy: 1000, medium: 2000, hard: 3000, deadly: 4500 },
    13: { easy: 1100, medium: 2200, hard: 3400, deadly: 5100 },
    14: { easy: 1250, medium: 2500, hard: 3800, deadly: 5700 },
    15: { easy: 1400, medium: 2800, hard: 4300, deadly: 6400 },
    16: { easy: 1600, medium: 3200, hard: 4800, deadly: 7200 },
    17: { easy: 2000, medium: 3900, hard: 5900, deadly: 8800 },
    18: { easy: 2100, medium: 4200, hard: 6300, deadly: 9500 },
    19: { easy: 2400, medium: 4900, hard: 7300, deadly: 10900 },
    20: { easy: 2800, medium: 5700, hard: 8500, deadly: 12700 }
};

// Sample of monsters from various sourcebooks
export const MONSTERS = {
    // Monster Manual
    ABOLETH: {
        name: "Aboleth",
        source: "MM",
        cr: "10",
        type: "aberration",
        size: "Large"
    },
    ANCIENT_RED_DRAGON: {
        name: "Ancient Red Dragon",
        source: "MM",
        cr: "24",
        type: "dragon",
        size: "Gargantuan"
    },

    // Volo's Guide to Monsters
    BODAK: {
        name: "Bodak",
        source: "VGM",
        cr: "6",
        type: "undead",
        size: "Medium"
    },
    ELDER_BRAIN: {
        name: "Elder Brain",
        source: "VGM",
        cr: "14",
        type: "aberration",
        size: "Large"
    },

    // Mordenkainen's Tome of Foes
    MARUT: {
        name: "Marut",
        source: "MTF",
        cr: "25",
        type: "construct",
        size: "Large"
    },
    NIGHTWALKER: {
        name: "Nightwalker",
        source: "MTF",
        cr: "20",
        type: "undead",
        size: "Huge"
    },

    // Eberron
    LORD_OF_BLADES: {
        name: "Lord of Blades",
        source: "ERLW",
        cr: "16",
        type: "construct",
        size: "Medium"
    },

    // Van Richten's Guide to Ravenloft
    NOSFERATU: {
        name: "Nosferatu",
        source: "VRGR",
        cr: "15",
        type: "undead",
        size: "Medium"
    },

    // Fizban's Treasury of Dragons
    ANCIENT_GOLD_GREATWYRM: {
        name: "Ancient Gold Greatwyrm",
        source: "FTD",
        cr: "27",
        type: "dragon",
        size: "Gargantuan"
    }
};

// Monster types for filtering
export const MONSTER_TYPES = [
    "aberration",
    "beast",
    "celestial",
    "construct",
    "dragon",
    "elemental",
    "fey",
    "fiend",
    "giant",
    "humanoid",
    "monstrosity",
    "ooze",
    "plant",
    "undead"
];
