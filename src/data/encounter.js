// XP Thresholds by Character Level
export const XP_THRESHOLDS = {
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

// XP Multipliers for Multiple Monsters
export const GROUP_SIZE_MULTIPLIERS = {
    1: 1,
    2: 1.5,
    3: 2,
    4: 2,
    5: 2,
    6: 2,
    7: 2.5,
    8: 2.5,
    9: 2.5,
    10: 2.5,
    11: 3,
    12: 3,
    13: 3,
    14: 3,
    15: 4
};

// Sample Monster List (You would typically have a much larger database)
export const MONSTERS = [
    { name: "Goblin", xp: 50, cr: "1/4" },
    { name: "Orc", xp: 100, cr: "1/2" },
    { name: "Wolf", xp: 50, cr: "1/4" },
    { name: "Bandit", xp: 25, cr: "1/8" },
    { name: "Ogre", xp: 450, cr: "2" },
    { name: "Giant Spider", xp: 200, cr: "1" },
    { name: "Owlbear", xp: 700, cr: "3" },
    { name: "Troll", xp: 1800, cr: "5" },
    { name: "Young Dragon", xp: 2300, cr: "6" },
    { name: "Adult Dragon", xp: 11500, cr: "13" }
];
