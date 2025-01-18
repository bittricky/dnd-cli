export const NPC_TEMPLATES = {
    // Basic NPCs (DMG)
    COMMONER: {
        name: "Commoner",
        source: "DMG",
        category: "Basic",
        cr: "0",
        type: "humanoid"
    },
    NOBLE: {
        name: "Noble",
        source: "DMG",
        category: "Basic",
        cr: "1/8",
        type: "humanoid"
    },
    GUARD: {
        name: "Guard",
        source: "DMG",
        category: "Basic",
        cr: "1/8",
        type: "humanoid"
    },

    // Specialized NPCs (Volo's Guide)
    ABJURER: {
        name: "Abjurer",
        source: "VGM",
        category: "Spellcaster",
        cr: "9",
        type: "humanoid"
    },
    ARCHDRUID: {
        name: "Archdruid",
        source: "VGM",
        category: "Spellcaster",
        cr: "12",
        type: "humanoid"
    },
    BLACKGUARD: {
        name: "Blackguard",
        source: "VGM",
        category: "Warrior",
        cr: "8",
        type: "humanoid"
    },
    
    // Sidekicks (Tasha's)
    EXPERT: {
        name: "Expert Sidekick",
        source: "TCE",
        category: "Sidekick",
        cr: "varies",
        type: "any"
    },
    SPELLCASTER: {
        name: "Spellcaster Sidekick",
        source: "TCE",
        category: "Sidekick",
        cr: "varies",
        type: "any"
    },
    WARRIOR: {
        name: "Warrior Sidekick",
        source: "TCE",
        category: "Sidekick",
        cr: "varies",
        type: "any"
    },

    // Eberron NPCs
    ARTIFICER_SPECIALIST: {
        name: "Artificer Specialist",
        source: "ERLW",
        category: "Specialist",
        cr: "4",
        type: "humanoid"
    },

    // Ravenloft NPCs
    VAMPIRE_HUNTER: {
        name: "Vampire Hunter",
        source: "VRGR",
        category: "Specialist",
        cr: "5",
        type: "humanoid"
    },

    // Additional specialized NPCs
    ASSASSIN: {
        name: "Assassin",
        source: "DMG",
        category: "Specialist",
        cr: "8",
        type: "humanoid"
    },
    ARCHMAGE: {
        name: "Archmage",
        source: "DMG",
        category: "Spellcaster",
        cr: "12",
        type: "humanoid"
    },
    PRIEST: {
        name: "Priest",
        source: "DMG",
        category: "Spellcaster",
        cr: "2",
        type: "humanoid"
    }
};

export const NPC_TRAITS = {
    PERSONALITY: [
        "Friendly and outgoing",
        "Suspicious and paranoid",
        "Quiet and reserved",
        "Boisterous and loud",
        "Scholarly and curious",
        "Aggressive and confrontational",
        "Peaceful and diplomatic",
        "Mysterious and enigmatic",
        "Helpful and generous",
        "Greedy and selfish"
    ],
    IDEALS: [
        "Knowledge - The pursuit of knowledge is the highest calling",
        "Power - Strength and power are the keys to success",
        "Nature - The natural world must be preserved and protected",
        "Justice - Everyone deserves fair treatment under the law",
        "Freedom - Everyone should be free to pursue their own path",
        "Order - Structure and rules are necessary for society",
        "Chaos - Change and unpredictability bring opportunity",
        "Balance - All things must exist in harmony",
        "Greater Good - The needs of the many outweigh personal desires",
        "Self-Interest - Look after yourself first"
    ],
    BONDS: [
        "Protective of family members",
        "Loyal to their guild or organization",
        "Seeking revenge for a past wrong",
        "Indebted to a powerful patron",
        "Guardian of an ancient secret",
        "Protector of their hometown",
        "Servant to a noble house",
        "Keeper of a sacred oath",
        "Searching for a lost love",
        "Bound by a mysterious curse"
    ],
    FLAWS: [
        "Prone to rage when frustrated",
        "Cannot resist a pretty face",
        "Haunted by past mistakes",
        "Suspicious of everyone",
        "Addicted to risk-taking",
        "Greedy for wealth",
        "Afraid of the dark",
        "Cannot keep a secret",
        "Prideful to a fault",
        "Envious of others' success"
    ],
    MANNERISMS: [
        "Speaks in whispers",
        "Uses large hand gestures",
        "Constantly fidgets",
        "Maintains intense eye contact",
        "Frequently clears throat",
        "Paces while thinking",
        "Drums fingers on surfaces",
        "Bites lower lip",
        "Adjusts clothing frequently",
        "Strokes chin while listening"
    ]
};
