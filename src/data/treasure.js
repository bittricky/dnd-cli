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
    CR_5_10: {
        coins: { cp: '2d6 × 100', sp: '2d6 × 1000', gp: '6d6 × 100', pp: '3d6 × 10' },
        gems_art: [
            { range: [1, 4], items: [] },
            { range: [5, 10], items: [{ type: 'art', value: 25, count: '2d4' }] },
            { range: [11, 16], items: [{ type: 'gem', value: 50, count: '3d6' }] },
            { range: [17, 22], items: [{ type: 'art', value: 100, count: '3d6' }] },
            { range: [23, 28], items: [{ type: 'gem', value: 100, count: '3d6' }] },
            { range: [29, 32], items: [{ type: 'art', value: 250, count: '2d4' }] },
            { range: [33, 36], items: [{ type: 'gem', value: 250, count: '2d4' }] },
            { range: [37, 40], items: [{ type: 'art', value: 750, count: '2d4' }] },
            { range: [41, 44], items: [{ type: 'gem', value: 500, count: '2d4' }] },
            { range: [45, 49], items: [{ type: 'gem', value: 1000, count: '2d4' }] },
            { range: [50, 54], items: [{ type: 'art', value: 2500, count: '2d4' }] },
            { range: [55, 59], items: [{ type: 'gem', value: 1000, count: '2d4' }] },
            { range: [60, 63], items: [{ type: 'art', value: 2500, count: '2d4' }] },
            { range: [64, 66], items: [{ type: 'gem', value: 5000, count: '2d4' }] },
            { range: [67, 69], items: [{ type: 'art', value: 7500, count: '1d4' }] },
            { range: [70, 72], items: [{ type: 'gem', value: 5000, count: '1d4' }] },
            { range: [73, 74], items: [{ type: 'art', value: 7500, count: '1d4' }] },
            { range: [75, 76], items: [{ type: 'gem', value: 5000, count: '1d4' }] },
            { range: [77, 78], items: [{ type: 'art', value: 7500, count: '1d4' }] },
            { range: [79, 80], items: [{ type: 'gem', value: 5000, count: '1d4' }] },
            { range: [81, 85], items: [{ type: 'gem', value: 5000, count: '1d4' }], magic_items: [{ table: 'A', count: '1d4' }] },
            { range: [86, 90], items: [{ type: 'art', value: 7500, count: '1d4' }], magic_items: [{ table: 'B', count: '1d4' }] },
            { range: [91, 95], items: [{ type: 'gem', value: 5000, count: '1d4' }], magic_items: [{ table: 'C', count: '1d4' }] },
            { range: [96, 100], items: [{ type: 'art', value: 7500, count: '1d4' }], magic_items: [{ table: 'D', count: '1d4' }] }
        ]
    },
    CR_11_16: {
        coins: { gp: '4d6 × 1000', pp: '5d6 × 100' },
        gems_art: [
            { range: [1, 3], items: [] },
            { range: [4, 6], items: [{ type: 'art', value: 250, count: '2d4' }] },
            { range: [7, 9], items: [{ type: 'art', value: 750, count: '2d4' }] },
            { range: [10, 12], items: [{ type: 'gem', value: 500, count: '3d6' }] },
            { range: [13, 15], items: [{ type: 'art', value: 1000, count: '3d6' }] },
            { range: [16, 19], items: [{ type: 'gem', value: 1000, count: '3d6' }] },
            { range: [20, 23], items: [{ type: 'art', value: 2500, count: '2d4' }] },
            { range: [24, 26], items: [{ type: 'gem', value: 2500, count: '2d4' }] },
            { range: [27, 29], items: [{ type: 'art', value: 7500, count: '2d4' }] },
            { range: [30, 35], items: [{ type: 'gem', value: 5000, count: '2d4' }] },
            { range: [36, 40], items: [{ type: 'art', value: 7500, count: '2d4' }] },
            { range: [41, 45], items: [{ type: 'gem', value: 5000, count: '2d4' }] },
            { range: [46, 50], items: [{ type: 'gem', value: 7500, count: '2d4' }] },
            { range: [51, 54], items: [{ type: 'art', value: 5000, count: '2d4' }] },
            { range: [55, 58], items: [{ type: 'gem', value: 7500, count: '2d4' }] },
            { range: [59, 62], items: [{ type: 'art', value: 7500, count: '2d4' }] },
            { range: [63, 66], items: [{ type: 'gem', value: 5000, count: '2d4' }] },
            { range: [67, 68], items: [{ type: 'art', value: 7500, count: '2d4' }] },
            { range: [69, 70], items: [{ type: 'gem', value: 5000, count: '2d4' }], magic_items: [{ table: 'C', count: '1d4' }] },
            { range: [71, 72], items: [{ type: 'art', value: 7500, count: '2d4' }], magic_items: [{ table: 'D', count: '1d4' }] },
            { range: [73, 74], items: [{ type: 'gem', value: 5000, count: '2d4' }], magic_items: [{ table: 'E', count: '1d4' }] },
            { range: [75, 76], items: [{ type: 'art', value: 7500, count: '2d4' }], magic_items: [{ table: 'F', count: '1d4' }] },
            { range: [77, 78], items: [{ type: 'gem', value: 5000, count: '2d4' }], magic_items: [{ table: 'G', count: '1d4' }] },
            { range: [79, 80], items: [{ type: 'art', value: 7500, count: '2d4' }], magic_items: [{ table: 'H', count: '1d4' }] },
            { range: [81, 85], items: [{ type: 'gem', value: 5000, count: '2d4' }], magic_items: [{ table: 'C', count: '1d4' }, { table: 'D', count: '1d4' }] },
            { range: [86, 90], items: [{ type: 'art', value: 7500, count: '2d4' }], magic_items: [{ table: 'E', count: '1d4' }, { table: 'F', count: '1d4' }] },
            { range: [91, 95], items: [{ type: 'gem', value: 5000, count: '2d4' }], magic_items: [{ table: 'G', count: '1d4' }, { table: 'H', count: '1d4' }] },
            { range: [96, 100], items: [{ type: 'art', value: 7500, count: '2d4' }], magic_items: [{ table: 'I', count: '1d4' }] }
        ]
    },
    CR_17_PLUS: {
        coins: { gp: '12d6 × 1000', pp: '8d6 × 1000' },
        gems_art: [
            { range: [1, 2], items: [] },
            { range: [3, 5], items: [{ type: 'gem', value: 1000, count: '3d6' }] },
            { range: [6, 8], items: [{ type: 'art', value: 2500, count: '1d10' }] },
            { range: [9, 11], items: [{ type: 'art', value: 7500, count: '1d4' }] },
            { range: [12, 14], items: [{ type: 'gem', value: 5000, count: '1d8' }] },
            { range: [15, 22], items: [{ type: 'gem', value: 1000, count: '3d6' }] },
            { range: [23, 30], items: [{ type: 'art', value: 2500, count: '1d10' }] },
            { range: [31, 38], items: [{ type: 'art', value: 7500, count: '1d4' }] },
            { range: [39, 46], items: [{ type: 'gem', value: 5000, count: '1d8' }] },
            { range: [47, 52], items: [{ type: 'gem', value: 5000, count: '3d6' }] },
            { range: [53, 58], items: [{ type: 'art', value: 7500, count: '1d10' }] },
            { range: [59, 63], items: [{ type: 'gem', value: 5000, count: '1d8' }] },
            { range: [64, 68], items: [{ type: 'art', value: 7500, count: '1d10' }] },
            { range: [69, 70], items: [{ type: 'gem', value: 5000, count: '1d8' }], magic_items: [{ table: 'C', count: '1d8' }] },
            { range: [71, 72], items: [{ type: 'art', value: 7500, count: '1d10' }], magic_items: [{ table: 'D', count: '1d8' }] },
            { range: [73, 74], items: [{ type: 'gem', value: 5000, count: '1d8' }], magic_items: [{ table: 'E', count: '1d8' }] },
            { range: [75, 76], items: [{ type: 'art', value: 7500, count: '1d10' }], magic_items: [{ table: 'F', count: '1d8' }] },
            { range: [77, 78], items: [{ type: 'gem', value: 5000, count: '1d8' }], magic_items: [{ table: 'G', count: '1d8' }] },
            { range: [79, 80], items: [{ type: 'art', value: 7500, count: '1d10' }], magic_items: [{ table: 'H', count: '1d8' }] },
            { range: [81, 85], items: [{ type: 'gem', value: 5000, count: '1d8' }], magic_items: [{ table: 'I', count: '1d4' }] },
            { range: [86, 90], items: [{ type: 'art', value: 7500, count: '1d10' }], magic_items: [{ table: 'C', count: '1d8' }, { table: 'D', count: '1d8' }] },
            { range: [91, 95], items: [{ type: 'gem', value: 5000, count: '1d8' }], magic_items: [{ table: 'E', count: '1d8' }, { table: 'F', count: '1d8' }] },
            { range: [96, 100], items: [{ type: 'art', value: 7500, count: '1d10' }], magic_items: [{ table: 'G', count: '1d8' }, { table: 'H', count: '1d8' }] }
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
    ],
    100: [
        "Amber (transparent watery gold to rich gold)",
        "Amethyst (transparent deep purple)",
        "Chrysoberyl (transparent yellow-green to pale green)",
        "Coral (opaque crimson)",
        "Garnet (transparent red, brown-green, or violet)",
        "Jade (translucent light green, deep green, or white)",
        "Jet (opaque deep black)",
        "Pearl (opaque lustrous white, yellow, or pink)",
        "Spinel (transparent red, red-brown, or deep green)",
        "Tourmaline (transparent pale green, blue, brown, or red)"
    ],
    250: [
        "Aquamarine (transparent pale blue-green)",
        "Peridot (transparent rich olive green)",
        "Topaz (transparent golden yellow)"
    ],
    500: [
        "Alexandrite (transparent dark green)",
        "Pearl, black (opaque pure black)",
        "Sapphire (transparent blue-white to medium blue)",
        "Corundum (transparent ruby-red)",
        "Emerald (transparent deep bright green)"
    ],
    1000: [
        "Black opal (translucent dark green with black mottling and golden flecks)",
        "Blue sapphire (transparent blue)",
        "Emerald (transparent deep bright green)",
        "Fire opal (translucent fiery red)",
        "Opal (translucent pale blue with green and golden mottling)"
    ],
    2500: [
        "Blue diamond (transparent light blue)",
        "Emerald (transparent brilliant green)",
        "Jacinth (transparent fiery orange)",
        "Ruby (transparent clear red to deep crimson)"
    ],
    5000: [
        "Black sapphire (translucent lustrous black with glowing highlights)",
        "Diamond (transparent blue-white, canary, pink, brown, or blue)",
        "Emerald (transparent brilliant green)",
        "Ruby (transparent clear red to deep crimson)"
    ],
    7500: [
        "Flawless diamond (transparent blue-white, canary, pink, brown, or blue)",
        "Flawless emerald (transparent brilliant green)",
        "Flawless ruby (transparent clear red to deep crimson)",
        "Star ruby (translucent ruby with white star-shaped center)"
    ]
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
    75: [
        "Large well-made tapestry",
        "Brass mug with jade inlay",
        "Box of turquoise animal figurines",
        "Gold bird cage with electrum filigree",
        "Silver and gold brooch",
        "Obsidian statuette with gold fittings and inlay",
        "Painted gold war mask",
        "Fine gold-thread embroidered silk handkerchief"
    ],
    100: [
        "Silver-hilted dagger",
        "Painted ivory figurine",
        "Small gold idol",
        "Gold bracelet with jade inlay",
        "Silk robes with gold threading",
        "Ceremonial silver chalice",
        "Silver and amber necklace",
        "Bronze and ivory statuette",
        "Carved wooden music box",
        "Gold circlet"
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
    ],
    750: [
        "Silver chalice set with moonstones",
        "Silver-plated steel longsword with jet set in hilt",
        "Carved harp of exotic wood with ivory inlay and zircon gems",
        "Small gold idol",
        "Gold dragon comb set with red garnets as eyes",
        "Bottle stopper cork embossed with gold leaf and set with amethysts",
        "Ceremonial electrum dagger with a black pearl in the pommel",
        "Silver and gold brooch",
        "Obsidian statuette with gold fittings and inlay"
    ],
    2500: [
        "Fine gold chain set with a fire opal",
        "Old masterpiece painting",
        "Embroidered silk and velvet mantle set with numerous moonstones",
        "Platinum bracelet set with a sapphire",
        "Embroidered glove set with jewel chips",
        "Jeweled anklet",
        "Gold music box",
        "Gold circlet set with four aquamarines"
    ],
    7500: [
        "Jeweled gold crown",
        "Jeweled platinum ring",
        "Small gold statuette set with rubies",
        "Gold cup set with emeralds",
        "Gold jewelry box with platinum filigree",
        "Painted gold war mask",
        "Life-sized ebony animal statue with gems for eyes",
        "Gold throne with jeweled inlay"
    ]
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
    B: [
        { range: [1, 15], item: "Potion of greater healing", source: "DMG" },
        { range: [16, 25], item: "Potion of fire breath", source: "DMG" },
        { range: [26, 35], item: "Potion of resistance", source: "DMG" },
        { range: [36, 45], item: "Ammunition, +1", source: "DMG" },
        { range: [46, 55], item: "Potion of animal friendship", source: "DMG" },
        { range: [56, 65], item: "Potion of hill giant strength", source: "DMG" },
        { range: [66, 75], item: "Potion of growth", source: "DMG" },
        { range: [76, 85], item: "Potion of water breathing", source: "DMG" },
        { range: [86, 95], item: "Spell scroll (2nd level)", source: "DMG" },
        { range: [96, 100], item: "Spell scroll (3rd level)", source: "DMG" }
    ],
    C: [
        { range: [1, 15], item: "Potion of superior healing", source: "DMG" },
        { range: [16, 30], item: "Spell scroll (4th level)", source: "DMG" },
        { range: [31, 45], item: "Ammunition, +2", source: "DMG" },
        { range: [46, 60], item: "Potion of clairvoyance", source: "DMG" },
        { range: [61, 75], item: "Potion of diminution", source: "DMG" },
        { range: [76, 90], item: "Potion of gaseous form", source: "DMG" },
        { range: [91, 95], item: "Potion of frost giant strength", source: "DMG" },
        { range: [96, 100], item: "Potion of stone giant strength", source: "DMG" }
    ],
    D: [
        { range: [1, 20], item: "Potion of supreme healing", source: "DMG" },
        { range: [21, 30], item: "Potion of invisibility", source: "DMG" },
        { range: [31, 40], item: "Potion of speed", source: "DMG" },
        { range: [41, 50], item: "Spell scroll (6th level)", source: "DMG" },
        { range: [51, 60], item: "Spell scroll (7th level)", source: "DMG" },
        { range: [61, 70], item: "Ammunition, +3", source: "DMG" },
        { range: [71, 80], item: "Oil of sharpness", source: "DMG" },
        { range: [81, 90], item: "Potion of flying", source: "DMG" },
        { range: [91, 95], item: "Potion of cloud giant strength", source: "DMG" },
        { range: [96, 100], item: "Potion of storm giant strength", source: "DMG" }
    ],
    E: [
        { range: [1, 30], item: "Spell scroll (8th level)", source: "DMG" },
        { range: [31, 55], item: "Potion of storm giant strength", source: "DMG" },
        { range: [56, 75], item: "Potion of supreme healing", source: "DMG" },
        { range: [76, 95], item: "Spell scroll (9th level)", source: "DMG" },
        { range: [96, 100], item: "Universal solvent", source: "DMG" }
    ],
    F: [
        { range: [1, 15], item: "Weapon, +1", source: "DMG" },
        { range: [16, 30], item: "Shield, +1", source: "DMG" },
        { range: [31, 45], item: "Sentinel shield", source: "DMG" },
        { range: [46, 60], item: "Amulet of proof against detection and location", source: "DMG" },
        { range: [61, 75], item: "Boots of elvenkind", source: "DMG" },
        { range: [76, 90], item: "Boots of striding and springing", source: "DMG" },
        { range: [91, 95], item: "Bracers of archery", source: "DMG" },
        { range: [96, 100], item: "Brooch of shielding", source: "DMG" }
    ],
    G: [
        { range: [1, 10], item: "Weapon, +2", source: "DMG" },
        { range: [11, 20], item: "Figurine of wondrous power", source: "DMG" },
        { range: [21, 30], item: "Adamantine armor", source: "DMG" },
        { range: [31, 40], item: "Armor, +1", source: "DMG" },
        { range: [41, 50], item: "Bag of tricks", source: "DMG" },
        { range: [51, 60], item: "Bracers of defense", source: "DMG" },
        { range: [61, 70], item: "Cloak of displacement", source: "DMG" },
        { range: [71, 80], item: "Cloak of the bat", source: "DMG" },
        { range: [81, 90], item: "Cube of force", source: "DMG" },
        { range: [91, 100], item: "Daern's instant fortress", source: "DMG" }
    ],
    H: [
        { range: [1, 10], item: "Weapon, +3", source: "DMG" },
        { range: [11, 20], item: "Amulet of the planes", source: "DMG" },
        { range: [21, 30], item: "Carpet of flying", source: "DMG" },
        { range: [31, 40], item: "Crystal ball", source: "DMG" },
        { range: [41, 50], item: "Ring of regeneration", source: "DMG" },
        { range: [51, 60], item: "Ring of shooting stars", source: "DMG" },
        { range: [61, 70], item: "Ring of telekinesis", source: "DMG" },
        { range: [71, 80], item: "Robe of scintillating colors", source: "DMG" },
        { range: [81, 90], item: "Robe of stars", source: "DMG" },
        { range: [91, 100], item: "Rod of absorption", source: "DMG" }
    ],
    I: [
        { range: [1, 5], item: "Defender", source: "DMG" },
        { range: [6, 10], item: "Hammer of thunderbolts", source: "DMG" },
        { range: [11, 15], item: "Luck blade", source: "DMG" },
        { range: [16, 20], item: "Sword of answering", source: "DMG" },
        { range: [21, 25], item: "Holy avenger", source: "DMG" },
        { range: [26, 30], item: "Ring of djinni summoning", source: "DMG" },
        { range: [31, 35], item: "Ring of invisibility", source: "DMG" },
        { range: [36, 40], item: "Ring of spell turning", source: "DMG" },
        { range: [41, 45], item: "Rod of lordly might", source: "DMG" },
        { range: [46, 50], item: "Staff of the magi", source: "DMG" },
        { range: [51, 55], item: "Vorpal sword", source: "DMG" },
        { range: [56, 60], item: "Belt of cloud giant strength", source: "DMG" },
        { range: [61, 65], item: "Armor, +2", source: "DMG" },
        { range: [66, 70], item: "Armor of invulnerability", source: "DMG" },
        { range: [71, 75], item: "Belt of storm giant strength", source: "DMG" },
        { range: [76, 80], item: "Cubic gate", source: "DMG" },
        { range: [81, 85], item: "Deck of many things", source: "DMG" },
        { range: [86, 90], item: "Efreeti chain", source: "DMG" },
        { range: [91, 95], item: "Half plate armor of resistance", source: "DMG" },
        { range: [96, 100], item: "Iron flask", source: "DMG" }
    ]
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
