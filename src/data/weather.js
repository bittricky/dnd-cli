// Climate Types
export const CLIMATES = {
    TEMPERATE: {
        name: 'Temperate',
        description: 'Moderate temperatures with distinct seasons',
        temperatureRange: {
            SPRING: { min: 45, max: 70 },
            SUMMER: { min: 60, max: 85 },
            FALL: { min: 40, max: 65 },
            WINTER: { min: 20, max: 45 }
        }
    },
    TROPICAL: {
        name: 'Tropical',
        description: 'Hot and humid with wet and dry seasons',
        temperatureRange: {
            WET: { min: 75, max: 95 },
            DRY: { min: 70, max: 90 }
        }
    },
    ARCTIC: {
        name: 'Arctic',
        description: 'Very cold with long winters and short summers',
        temperatureRange: {
            SUMMER: { min: 30, max: 50 },
            WINTER: { min: -40, max: 20 }
        }
    },
    DESERT: {
        name: 'Desert',
        description: 'Hot days, cold nights, very little precipitation',
        temperatureRange: {
            DAY: { min: 85, max: 120 },
            NIGHT: { min: 40, max: 65 }
        }
    }
};

// Precipitation Types
export const PRECIPITATION = {
    NONE: {
        name: 'None',
        description: 'Clear skies'
    },
    LIGHT: {
        name: 'Light',
        description: 'Light rain or snow',
        effects: {
            visibility: 'slightly reduced',
            terrain: 'slightly muddy or slick',
            travel: 'no significant impact'
        }
    },
    MODERATE: {
        name: 'Moderate',
        description: 'Steady rain or snow',
        effects: {
            visibility: 'reduced',
            terrain: 'muddy or slick',
            travel: 'normal speed through rain, half speed through snow'
        }
    },
    HEAVY: {
        name: 'Heavy',
        description: 'Heavy rain or snow',
        effects: {
            visibility: 'heavily reduced',
            terrain: 'very muddy or icy',
            travel: 'half speed through rain, quarter speed through snow'
        }
    },
    SEVERE: {
        name: 'Severe',
        description: 'Storms, blizzards, or monsoons',
        effects: {
            visibility: 'severely reduced',
            terrain: 'hazardous',
            travel: 'extremely difficult or impossible'
        }
    }
};

// Wind Conditions
export const WIND = {
    CALM: {
        name: 'Calm',
        description: '0-5 mph, smoke rises vertically',
        effects: {
            ranged: 'no effect',
            flying: 'no effect'
        }
    },
    LIGHT: {
        name: 'Light Breeze',
        description: '6-15 mph, leaves rustle',
        effects: {
            ranged: 'no effect',
            flying: 'no effect'
        }
    },
    MODERATE: {
        name: 'Moderate Wind',
        description: '16-25 mph, small branches move',
        effects: {
            ranged: 'disadvantage on long range',
            flying: 'difficult terrain for small creatures'
        }
    },
    STRONG: {
        name: 'Strong Wind',
        description: '26-38 mph, large branches move',
        effects: {
            ranged: 'disadvantage on all ranges',
            flying: 'difficult terrain for medium creatures'
        }
    },
    SEVERE: {
        name: 'Severe Wind',
        description: '39-54 mph, whole trees in motion',
        effects: {
            ranged: 'impossible',
            flying: 'nearly impossible'
        }
    }
};

// Special Weather Events
export const SPECIAL_EVENTS = {
    TEMPERATE: [
        {
            name: 'Thunderstorm',
            description: 'Thunder and lightning with heavy rain',
            effects: {
                lightning: '1d6 chance of strike within 100ft each minute',
                thunder: 'DC 15 CON save or be deafened for 1 minute',
                visibility: 'heavily obscured beyond 100 feet'
            }
        },
        {
            name: 'Fog',
            description: 'Dense fog reduces visibility',
            effects: {
                visibility: 'heavily obscured beyond 30 feet',
                navigation: 'disadvantage on Survival checks'
            }
        }
    ],
    TROPICAL: [
        {
            name: 'Monsoon',
            description: 'Extremely heavy rainfall',
            effects: {
                flooding: 'difficult terrain everywhere',
                visibility: 'heavily obscured beyond 60 feet'
            }
        },
        {
            name: 'Hurricane',
            description: 'Devastating storm with extreme winds',
            effects: {
                wind: 'severe wind effects',
                debris: '2d6 bludgeoning damage per minute outdoors'
            }
        }
    ],
    ARCTIC: [
        {
            name: 'Blizzard',
            description: 'Severe snow storm with high winds',
            effects: {
                visibility: 'zero beyond 30 feet',
                exhaustion: 'CON save every hour or gain exhaustion'
            }
        },
        {
            name: 'White Out',
            description: 'Complete loss of visibility in snow',
            effects: {
                visibility: 'blinded condition',
                navigation: 'automatic failure on navigation checks'
            }
        }
    ],
    DESERT: [
        {
            name: 'Sandstorm',
            description: 'Violent winds carrying sand and debris',
            effects: {
                damage: '1d4 slashing damage per minute exposed',
                visibility: 'heavily obscured beyond 30 feet'
            }
        },
        {
            name: 'Heat Wave',
            description: 'Extreme temperatures',
            effects: {
                exhaustion: 'CON save every 30 minutes or gain exhaustion',
                water: 'Double water consumption'
            }
        }
    ]
};

// Seasonal Events
export const SEASONAL_EVENTS = {
    SPRING: [
        {
            name: 'Spring Bloom',
            description: 'Flowers bloom and pollen fills the air',
            effects: {
                allergies: 'DC 12 CON save or disadvantage on Perception',
                healing: 'Advantage on Herbalism checks'
            }
        },
        {
            name: 'Spring Rain',
            description: 'Gentle, continuous rainfall',
            effects: {
                growth: 'Plants grow at double rate',
                mood: 'Advantage on Performance checks'
            }
        }
    ],
    SUMMER: [
        {
            name: 'Summer Solstice',
            description: 'Longest day of the year',
            effects: {
                magic: 'Advantage on radiant damage spells',
                light: 'Extended daylight hours'
            }
        },
        {
            name: 'Drought',
            description: 'Extended period without rain',
            effects: {
                water: 'Water sources begin to dry up',
                fire: 'Fire damage increased by 1d6'
            }
        }
    ],
    FALL: [
        {
            name: 'Harvest Moon',
            description: 'Bright full moon during harvest',
            effects: {
                vision: 'No disadvantage on Perception at night',
                magic: 'Enhanced divination magic'
            }
        },
        {
            name: 'Fall Colors',
            description: 'Trees display vibrant colors',
            effects: {
                stealth: 'Advantage on Stealth in wooded areas',
                inspiration: 'Advantage on artistic ability checks'
            }
        }
    ],
    WINTER: [
        {
            name: 'Winter Solstice',
            description: 'Shortest day of the year',
            effects: {
                magic: 'Advantage on cold damage spells',
                darkness: 'Extended night hours'
            }
        },
        {
            name: 'Deep Freeze',
            description: 'Extremely cold temperatures',
            effects: {
                movement: 'Difficult terrain on any wet surface',
                cold: 'Cold damage increased by 1d6'
            }
        }
    ]
};
