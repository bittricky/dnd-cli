# D&D CLI Tool

An offline, cross-platform command-line toolkit for Dungeon Masters and Players running D&D 5th Edition (5e) campaigns. This tool provides essential utilities for character management, encounter building, and game mechanics.

## Supported D&D Editions & Sourcebooks

This tool is designed for **D&D 5th Edition (5e)** and includes content from:

### Core Rulebooks
- Player's Handbook (PHB)
- Dungeon Master's Guide (DMG)
- Monster Manual (MM)

### Expansions
- Sword Coast Adventurer's Guide (SCAG)
- Volo's Guide to Monsters (VGM)
- Xanathar's Guide to Everything (XGE)
- Mordenkainen's Tome of Foes (MTF)
- Eberron: Rising from the Last War (ERLW)
- Tasha's Cauldron of Everything (TCE)
- Van Richten's Guide to Ravenloft (VRGR)
- Fizban's Treasury of Dragons (FTD)
- Strixhaven: A Curriculum of Chaos (SCC)

Users can enable/disable specific sourcebooks to customize their experience.

## Installation

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dnd-cli.git
   cd dnd-cli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make the CLI globally accessible (optional):
   ```bash
   npm link
   ```

## Features

### 1. Character Generator
Create complete character sheets with expanded options from all supported sourcebooks:
- All official races and subraces
- All classes including Artificer
- All official subclasses
- Variant features (e.g., Custom Lineage from Tasha's)
- Configurable sourcebook selection
- Random or chosen attributes
- Ability score generation (4d6 drop lowest)
- Character export to text files

```bash
# Access via menu or direct command
dnd character
```

### 2. NPC Generator
Quick NPC generation with expanded options:
- 35+ NPC classes/templates
- Stat blocks from various sourcebooks
- Personality traits and backgrounds
- Specialized variants (e.g., sidekicks from Tasha's)

```bash
dnd npc
```

### 3. Dice Roller
Versatile dice rolling system:
- Support for all standard dice (d4, d6, d8, d10, d12, d20, d100)
- Multiple dice rolls
- Advantage/Disadvantage support
- Custom modifiers

```bash
dnd dice
```

### 4. Encounter Calculator
Calculate encounter difficulty using expanded monster options:
- Party size and levels
- Monster CR and quantity
- Extended monster list from all sourcebooks
- XP thresholds and multipliers

```bash
dnd encounter
```

### 5. Loot Generator
Generate treasure using expanded item tables:
- CR-appropriate rewards
- Magic items from all sourcebooks
- Setting-specific items (e.g., Eberron's Dragonshards)
- Individual or hoard treasure options

```bash
dnd loot
```

### 6. Initiative Roller
Handle combat initiative with:
- Bulk roll for multiple creatures
- Initiative tracking
- Sort order display
- Support for group initiative variants

```bash
dnd initiative
```

### 7. Tarokka Card Game
Full implementation of the Curse of Strahd Tarokka deck:
- High deck and common deck support
- Card reading simulation
- Integration with Van Richten's Guide content
- Fortune telling interpretations

```bash
dnd tarokka
```

### 8. Wild Magic Effects
Expanded Wild Magic surge effects:
- PHB Wild Magic table
- Additional effects from supplements
- Custom table support
- Automated effect resolution

```bash
dnd wildmagic
```

## Usage

### Interactive Mode
1. Start the interactive menu:
   ```bash
   dnd
   ```
2. Use arrow keys to navigate
3. Press Enter to select an option
4. Follow the prompts for each feature

### Direct Commands
Access features directly using subcommands:
```bash
dnd character   # Character generator
dnd dice        # Dice roller
dnd encounter   # Encounter calculator
# ... etc
```

### Sourcebook Configuration
- Enable/disable specific sourcebooks through the menu
- Filter available options based on enabled books
- Save preferences for future sessions

## Data Storage

- Character sheets are saved in the `./characters` directory
- All data is stored locally - no internet connection required
- Files are saved in human-readable text format
- Optional JSON export for programmatic use

## Contributing

This project follows the [Trunk Based Development](https://trunkbaseddevelopment.com/) workflow.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Based on official D&D 5e ruleset by Wizards of the Coast
- Inspired by various D&D tools and utilities in the community

## Disclaimer

This tool is a fan-made project and is not affiliated with, endorsed, sponsored, or specifically approved by [Wizards of the Coast LLC](https://company.wizards.com/en). Dungeons & Dragons and D&D are trademarks of Wizards of the Coast LLC.
