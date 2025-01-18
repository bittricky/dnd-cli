// Individual Treasure Tables
export const INDIVIDUAL_TREASURE = {
    CR_0_4: [
        { range: [1, 30], coins: { cp: '5d6' } },
        { range: [31, 60], coins: { sp: '4d6' } },
        { range: [61, 70], coins: { ep: '3d6' } },
        { range: [71, 95], coins: { gp: '3d6' } },
        { range: [96, 100], coins: { pp: '1d6' } }
    ],
    CR_5_10: [
        { range: [1, 30], coins: { cp: '4d6 × 100', ep: '1d6 × 10' } },
        { range: [31, 60], coins: { sp: '6d6 × 10', gp: '2d6 × 10' } },
        { range: [61, 70], coins: { ep: '3d6 × 10', gp: '2d6 × 10' } },
        { range: [71, 95], coins: { gp: '4d6 × 10' } },
        { range: [96, 100], coins: { gp: '2d6 × 10', pp: '3d6' } }
    ],
    CR_11_16: [
        { range: [1, 20], coins: { sp: '4d6 × 100', gp: '1d6 × 100' } },
        { range: [21, 35], coins: { ep: '1d6 × 100', gp: '1d6 × 100' } },
        { range: [36, 75], coins: { gp: '2d6 × 100', pp: '1d6 × 10' } },
        { range: [76, 100], coins: { gp: '2d6 × 100', pp: '2d6 × 10' } }
    ],
    CR_17_PLUS: [
        { range: [1, 15], coins: { ep: '2d6 × 1000', gp: '8d6 × 100' } },
        { range: [16, 55], coins: { gp: '1d6 × 1000', pp: '1d6 × 100' } },
        { range: [56, 100], coins: { gp: '1d6 × 1000', pp: '2d6 × 100' } }
    ]
};

// Hoard Treasure Tables
export const HOARD_TREASURE = {
    CR_0_4: {
        coins: { cp: '6d6 × 100', sp: '3d6 × 100', gp: '2d6 × 10' },
        gems_art: [
            { range: [1, 6], items: [] },
            { range: [7, 16], items: [{ type: 'gem', value: 10, count: '2d6' }] },
            { range: [17, 26], items: [{ type: 'art', value: 25, count: '2d4' }] },
            { range: [27, 36], items: [{ type: 'gem', value: 50, count: '2d6' }] },
            { range: [37, 44], items: [{ type: 'art', value: 25, count: '2d4' }] },
            { range: [45, 52], items: [{ type: 'gem', value: 10, count: '2d6' }] },
            { range: [53, 60], items: [{ type: 'gem', value: 50, count: '2d6' }] },
            { range: [61, 65], items: [{ type: 'art', value: 25, count: '2d4' }] },
            { range: [66, 70], items: [{ type: 'gem', value: 50, count: '2d6' }] },
            { range: [71, 75], items: [{ type: 'art', value: 75, count: '2d4' }] },
            { range: [76, 78], items: [{ type: 'art', value: 25, count: '2d4' }] },
            { range: [79, 80], items: [{ type: 'gem', value: 50, count: '2d6' }] },
            { range: [81, 85], items: [{ type: 'art', value: 75, count: '2d4' }] },
            { range: [86, 92], items: [{ type: 'art', value: 25, count: '2d4' }] },
            { range: [93, 97], items: [{ type: 'gem', value: 50, count: '2d6' }] },
            { range: [98, 99], items: [{ type: 'art', value: 75, count: '2d4' }] },
            { range: [100, 100], items: [{ type: 'gem', value: 50, count: '2d6' }] }
        ],
        magic_items_table: 'A'
    },
    // Additional CR ranges follow similar pattern...
};

// Magic Item Tables
export const MAGIC_ITEM_TABLES = {
    A: [
        { range: [1, 50], item: "Potion of healing", source: "DMG" },
        { range: [51, 60], item: "Spell scroll (cantrip)", source: "DMG" },
        { range: [61, 70], item: "Potion of climbing", source: "DMG" },
        { range: [71, 90], item: "Spell scroll (1st level)", source: "DMG" },
        { range: [91, 94], item: "Spell scroll (2nd level)", source: "DMG" },
        { range: [95, 98], item: "Potion of greater healing", source: "DMG" },
        { range: [99, 100], item: "Bag of holding", source: "DMG" }
    ],
    // More tables...
};

// Campaign-Specific Items
export const SETTING_SPECIFIC_ITEMS = {
    EBERRON: {
        DRAGONSHARDS: [
            { name: "Eberron Dragonshard", value: "500 gp", rarity: "uncommon" },
            { name: "Khyber Dragonshard", value: "1000 gp", rarity: "rare" },
            { name: "Siberys Dragonshard", value: "2500 gp", rarity: "very rare" }
        ],
        MAGIC_ITEMS: [
            { name: "Docent", rarity: "rare", source: "ERLW" },
            { name: "Wheel of Wind and Water", rarity: "uncommon", source: "ERLW" }
        ]
    },
    RAVENLOFT: {
        DARK_GIFTS: [
            { name: "Amber Sarcophagus", rarity: "very rare", source: "VRGR" },
            { name: "Ghost Lantern", rarity: "rare", source: "VRGR" }
        ]
    },
    THEROS: {
        SUPERNATURAL_GIFTS: [
            { name: "Supernatural Gift", source: "MOT" },
            { name: "Artifact", source: "MOT" }
        ]
    }
};

// Gems and Art Objects
export const GEMS = {
    10: [
        "Azurite (opaque mottled deep blue)",
        "Banded agate (brown, blue, white, or red)",
        "Blue quartz (transparent pale blue)",
        "Eye agate (translucent circles of gray, white, brown, blue, or green)",
        "Hematite (opaque gray-black)",
        "Lapis lazuli (opaque light and dark blue with yellow flecks)",
        "Malachite (opaque striated light and dark green)",
        "Moss agate (translucent pink or yellow-white with mossy gray or green markings)",
        "Obsidian (opaque black)",
        "Rhodochrosite (opaque light pink)",
        "Tiger eye (translucent brown with golden center)",
        "Turquoise (opaque light blue-green)"
    ],
    50: [
        "Bloodstone (opaque dark gray with red flecks)",
        "Carnelian (opaque orange to red-brown)",
        "Chalcedony (opaque white)",
        "Chrysoprase (translucent green)",
        "Citrine (transparent pale yellow-brown)",
        "Jasper (opaque blue, black, or brown)",
        "Moonstone (translucent white with pale blue glow)",
        "Onyx (opaque bands of black and white, or pure black or white)",
        "Quartz (transparent white, smoky gray, or yellow)",
        "Sardonyx (opaque bands of red and white)",
        "Star rose quartz (translucent rosy stone with white star-shaped center)",
        "Zircon (transparent pale blue-green)"
    ]
    // Additional gem tiers...
};

export const ART_OBJECTS = {
    25: [
        "Silver ewer",
        "Carved bone statuette",
        "Small gold bracelet",
        "Cloth-of-gold vestments",
        "Black velvet mask stitched with silver thread",
        "Copper chalice with silver filigree",
        "Pair of engraved bone dice",
        "Small mirror set in a painted wooden frame",
        "Embroidered silk handkerchief",
        "Gold locket with a painted portrait inside"
    ],
    250: [
        "Gold ring set with bloodstones",
        "Carved ivory statuette",
        "Large gold bracelet",
        "Silver necklace with a gemstone pendant",
        "Bronze crown",
        "Silk robe with gold embroidery",
        "Large well-made tapestry",
        "Brass mug with jade inlay",
        "Box of turquoise animal figurines",
        "Gold bird cage with electrum filigree"
    ]
    // Additional art object tiers...
};
