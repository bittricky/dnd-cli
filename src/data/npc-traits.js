export const NPC_TRAITS = {
    // Personality traits from PHB backgrounds
    PERSONALITY: {
        ACOLYTE: [
            "I idolize a particular hero of my faith, and constantly refer to that person's deeds and example.",
            "I can find common ground between the fiercest enemies, empathizing with them and always working toward peace.",
            "I see omens in every event and action. The gods try to speak to us, we just need to listen.",
            "Nothing can shake my optimistic attitude.",
            "I quote (or misquote) sacred texts and proverbs in almost every situation.",
            "I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods."
        ],
        CRIMINAL: [
            "I always have a plan for what to do when things go wrong.",
            "I am always calm, no matter what the situation. I never raise my voice or let emotions control me.",
            "The first thing I do in a new place is note the locations of everything valuable—or where such things could be hidden.",
            "I would rather make a new friend than a new enemy.",
            "I am incredibly slow to trust. Those who seem the fairest often have the most to hide.",
            "I don't pay attention to the risks in a situation. Never tell me the odds."
        ]
    },

    // Ideals from PHB backgrounds
    IDEALS: {
        GOOD: [
            "Greater Good. Our lot is to lay down our lives in defense of others.",
            "Charity. I always try to help those in need, no matter what the personal cost.",
            "Respect. People deserve to be treated with dignity and respect.",
            "Beauty. What is beautiful points us beyond itself toward what is true."
        ],
        LAWFUL: [
            "Tradition. The ancient traditions of worship and sacrifice must be preserved and upheld.",
            "Power. I hope to one day rise to the top of my faith's religious hierarchy.",
            "Justice. We must help bring justice to an unjust world."
        ],
        NEUTRAL: [
            "Balance. All things must be kept in balance.",
            "Knowledge. The path to power and self-improvement is through knowledge.",
            "Live and Let Live. Meddling in the affairs of others only causes trouble."
        ],
        CHAOTIC: [
            "Change. We must help bring about the changes the gods are constantly working in the world.",
            "Freedom. Everyone should be free to pursue their own calling.",
            "Independence. I must prove that I can handle myself without the coddling of my family."
        ],
        EVIL: [
            "Power. I hope to one day rise to the top through any means necessary.",
            "Greed. I will do whatever it takes to become wealthy.",
            "Might. The strong do what they will, and the weak endure what they must."
        ]
    },

    // Bonds from PHB backgrounds
    BONDS: [
        "I would die to recover an ancient relic of my faith that was lost long ago.",
        "I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.",
        "I owe my life to the priest who took me in when my parents died.",
        "Everything I do is for the common people.",
        "I will do anything to protect the temple where I served.",
        "I seek to preserve a sacred text that my enemies consider heretical and seek to destroy."
    ],

    // Flaws from PHB backgrounds
    FLAWS: [
        "I judge others harshly, and myself even more severely.",
        "I put too much trust in those who wield power within my temple's hierarchy.",
        "My piety sometimes leads me to blindly trust those that profess faith in my god.",
        "I am inflexible in my thinking.",
        "I am suspicious of strangers and expect the worst of them.",
        "Once I pick a goal, I become obsessed with it to the detriment of everything else in my life."
    ],

    // Physical appearance traits
    APPEARANCE: {
        HEIGHT: {
            HUMAN: ["short", "average height", "tall", "very tall"],
            ELF: ["gracefully short", "average height", "gracefully tall", "exceptionally tall"],
            DWARF: ["stout and short", "average height for a dwarf", "tall for a dwarf", "impressively tall for a dwarf"],
            HALFLING: ["tiny", "short even for a halfling", "average height for a halfling", "tall for a halfling"]
        },
        BUILD: ["thin", "lean", "athletic", "muscular", "stocky", "heavy", "plump"],
        FEATURES: [
            "striking eyes",
            "distinctive nose",
            "perfect teeth",
            "crooked teeth",
            "weathered face",
            "smooth skin",
            "scarred face",
            "tattoos",
            "birthmark",
            "freckles"
        ],
        CLOTHING: [
            "well-maintained but simple clothes",
            "finely tailored garments",
            "practical work clothes",
            "threadbare outfit",
            "colorful and flamboyant attire",
            "dark and nondescript clothing",
            "formal robes",
            "mix of different styles"
        ]
    },

    // Background occupations by location
    OCCUPATIONS: {
        CITY: [
            "Merchant",
            "Artisan",
            "Guard",
            "Scholar",
            "Noble",
            "Servant",
            "Entertainer",
            "Criminal",
            "Priest",
            "Bureaucrat"
        ],
        VILLAGE: [
            "Farmer",
            "Blacksmith",
            "Innkeeper",
            "Miller",
            "Hunter",
            "Healer",
            "Carpenter",
            "Shepherd",
            "Fisher",
            "Weaver"
        ],
        WILDERNESS: [
            "Ranger",
            "Trapper",
            "Guide",
            "Hermit",
            "Druid",
            "Outlaw",
            "Monster Hunter",
            "Prospector",
            "Explorer",
            "Beast Tamer"
        ]
    },

    // Motivations
    MOTIVATIONS: {
        PRIMARY: [
            "Wealth and riches",
            "Power and influence",
            "Knowledge and wisdom",
            "Fame and glory",
            "Love and family",
            "Revenge and retribution",
            "Justice and order",
            "Freedom and independence",
            "Faith and devotion",
            "Adventure and excitement"
        ],
        SECONDARY: [
            "Protect loved ones",
            "Prove their worth",
            "Escape their past",
            "Find their place",
            "Make amends",
            "Fulfill a prophecy",
            "Win someone's approval",
            "Solve a mystery",
            "Create a legacy",
            "Find inner peace"
        ]
    }
};
