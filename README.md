# D&D CLI Tool

> Create stories together—Dungeons & Dragons is a collaborative way to bring out your imagination.

A comprehensive command-line interface tool for Dungeons & Dragons 5th Edition game masters and players. Built with functional programming principles for reliability and maintainability.

## Features

### Character Tools
- **Character Generator**: Create new player characters with randomly generated stats
- **NPC Generator**: Generate detailed NPCs with personalities, backgrounds, and motivations
- **Initiative Tracker**: Manage combat turns and track initiative order with multiple tracking modes

### Game Management
- **Dice Roller**: Roll any combination of dice with modifiers (e.g., 2d6+3)
- **Loot Generator**: Generate treasure hoards and magic items appropriate for any challenge rating

### Atmosphere & Story
- **Weather Generator**: Create realistic weather conditions for different climates and seasons
- **Tarokka Reading**: Perform card readings using the Tarokka deck (standard and custom readings)
- **Wild Magic Effects**: Generate Wild Magic Surge effects with various trigger methods (Standard, Escalating, Spell-Level, Critical)

## Installation

```bash
# Clone the repository
git clone https://github.com/bittricky/dnd-cli.git

# Install dependencies
cd dnd-cli
npm install

# Link for development
npm link
```

## Usage

```bash
# Start the interactive CLI
dnd-cli

# Or use the shorter alias
dnd
```

## Commands

### Character Generator
Generate a new player character with random stats:
- Rolls ability scores using 4d6 drop lowest
- Calculates ability modifiers
- Generates basic character stats
- Saves character sheets for future reference

### NPC Generator
Create detailed NPCs with:
- Personality traits, ideals, bonds, and flaws
- Physical appearance and mannerisms
- Background and occupation
- Motivations and goals
- Save NPC details for future use

### Dice Roller
Roll any combination of dice:
- Supports standard dice (d4, d6, d8, d10, d12, d20, d100)
- Add/subtract modifiers
- Roll with advantage/disadvantage
- Roll multiple dice at once

### Loot Generator
Generate treasure appropriate for any challenge rating:
- Individual treasure drops
- Hoard treasure
- Magic items by rarity
- Calculate total value in gold

### Initiative Tracker
Track combat with multiple variants:
- **Standard**: Traditional d20 + DEX modifier
- **Advantage**: Support for features like Alert feat
- **Group**: Roll once for each type of creature
- **Speed Factor**: Modified initiative based on action type and weapon size
Features include:
- Add/remove combatants dynamically
- Track conditions and durations
- Automatic condition cleanup
- Combat round management

### Weather Generator
Create weather conditions with:
- Temperature based on climate and season
- Precipitation and wind conditions
- Special weather events
- Seasonal effects

### Tarokka Reading
Perform card readings using the Tarokka deck:
- Full readings with High and Common decks
- Custom table support
- Save and load custom card meanings
- Multiple reading types (single card, three-card spread, full reading)

### Wild Magic Effects
Generate Wild Magic Surge effects with multiple trigger methods:
- **Standard**: Classic 1-in-20 chance
- **Escalating**: Increasing probability after each non-surge
- **Spell-Level**: Surge chance based on spell level
- **Critical**: Surge on natural 1s or 20s
Features include:
- PHB and Tasha's Cauldron effects
- Custom effect table support
- Surge tracking and statistics
- Save and load custom tables

## Development

The project follows functional programming principles:
- Pure functions for predictable behavior
- Immutable state management
- Clear separation of concerns
- Modular command structure

### Project Structure
```
dnd-cli/
├── src/
│   ├── commands/        # Individual command implementations
│   ├── data/           # Game data and tables
│   └── menu.js         # Main menu interface
├── test/# Test files
├── utils/              # Utility files
└── custom-tables/      # User-created custom tables (gitignored)
```

### Contributing

This project follows the [Trunk Based Development](https://trunkbaseddevelopment.com/) workflow.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This tool is a fan-made project and is not affiliated with, endorsed, sponsored, or specifically approved by [Wizards of the Coast LLC](https://company.wizards.com/en). Dungeons & Dragons are trademarks of Wizards of the Coast LLC.
