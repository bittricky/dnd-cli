# D&D CLI Tool

> Create your own stories together — [Dungeons & Dragons](https://www.youtube.com/watch?v=ey3YyfV6IDk) is a collaborative way to bring out your imagination offline or online.

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
│   ├── commands/       # Individual command implementations
│   ├── data/           # Game data and tables
│   └── menu.js         # Main menu interface
├── test/               # Test files
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

## Therapeutic Effects

Playing **Dungeons and Dragons (D&D)** at an any age provides a holistic therapeutic experience that benefits emotional, social, and cognitive well-being. Below is a summary of its key advantages:

### Emotional Benefits
- **Self-Expression and Emotional Regulation**: Role-playing allows individuals to safely explore their own personality traits, emotions, improving emotional resilience and offering an outlet for stress relief.
- **Confidence Building**: Making decisions and solving challenges within the game fosters a sense of accomplishment and self-assurance.
- **Stress Reduction**: The immersive, creative nature of the game provides healthy escapism, helping to alleviate daily stressors.

### Social Benefits
- **Improved Social Skills**: Encourages teamwork, communication, and empathy, offering a structured way to practice these essential interpersonal abilities as you explore different situations of morality.
- **Community and Belonging**: Playing in a group fosters connection and reduces feelings of loneliness, creating a sense of camaraderie and mutual support.
- **Conflict Resolution**: Engaging in cooperative storytelling enhances the ability to navigate disagreements constructively.

### Cognitive Benefits
- **Problem-Solving and Strategic Thinking**: Players are required to think critically, plan, and adapt, strengthening cognitive flexibility.
- **Creativity**: Storytelling and character development stimulate imagination, fostering mental flexibility and innovation.
- **Enhanced Executive Function**: Keeping track of character stats, planning strategies, and solving puzzles bolster memory and focus.

### Overall Benefits for Mental Health
D&D is particularly effective for people managing mental health challenges such as anxiety, trauma, or any other medically recognized form of neurodivergence. It provides:
- A **judgment-free space** to process emotions and develop coping strategies.
- A **sense of empowerment** and control through character-driven narratives.
- A **growing community** to connect with others.
- Opportunities to practice real-world skills in a low-pressure, stress-free, and imaginative environment that can be applied in a real-life setting.

## Research Support
- **Narrative Therapy and Mental Health**: Studies like the [(Blackmon, 2016; Rosselet & Stauffer, 2013)](https://psycnet.apa.org/record/2013-36489-001) show that role-playing games can empower individuals and build emotional resilience.
- **Mental Health and Community**: Research from [University College Cork (UCC)](https://www.ucc.ie/en/news/2024/playing-dungeons-and-dragons-can-support-mental-health-.html) highlights D&D's role in fostering mental health through creativity, escapism, and social connection.
- **Therapeutic Applications**: As detailed by [Therapy Unlocked](https://therapy-unlocked.com/dungeons-and-dragons-therapy/), D&D offers structured opportunities for emotional exploration, social bonding, and personal growth.
- [Drama Therapy](https://www.psychologytoday.com/us/blog/mind-matters-menninger/202007/the-power-drama-therapy) also acknowledges D&D's therapeutic potential, highlighting its ability to foster empathy, creativity, and self-awareness.

D&D provides a unique and engaging way for people to address their emotional, social, and cognitive needs. Its provides a combination of storytelling, strategy, and collaboration that creates a powerful tool for personal growth, development of skills to support positive mental health, and opportunities to foster meaningful connections. Sometimes it is also nice to not look at a screen.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This tool is a fan-made project and is not affiliated with, endorsed, sponsored, or specifically approved by [Wizards of the Coast LLC](https://company.wizards.com/en). Dungeons & Dragons are trademarks of Wizards of the Coast LLC.
