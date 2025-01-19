import inquirer from 'inquirer';
import chalk from 'chalk';
import { CLIMATES, PRECIPITATION, WIND, SPECIAL_EVENTS, SEASONAL_EVENTS } from '../data/weather.js';

async function selectClimate() {
    const { climate } = await inquirer.prompt([
        {
            type: 'list',
            name: 'climate',
            message: 'Select the climate type:',
            choices: Object.values(CLIMATES).map(c => ({
                name: `${c.name} - ${c.description}`,
                value: c
            }))
        }
    ]);
    return climate;
}

async function selectSeason(climate) {
    const seasons = Object.keys(climate.temperatureRange);
    const { season } = await inquirer.prompt([
        {
            type: 'list',
            name: 'season',
            message: 'Select the season:',
            choices: seasons
        }
    ]);
    return season;
}

function rollTemperature(climate, season) {
    const range = climate.temperatureRange[season];
    return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
}

function rollPrecipitation() {
    const roll = Math.random() * 100;
    if (roll < 40) return PRECIPITATION.NONE;
    if (roll < 65) return PRECIPITATION.LIGHT;
    if (roll < 85) return PRECIPITATION.MODERATE;
    if (roll < 95) return PRECIPITATION.HEAVY;
    return PRECIPITATION.SEVERE;
}

function rollWind() {
    const roll = Math.random() * 100;
    if (roll < 30) return WIND.CALM;
    if (roll < 60) return WIND.LIGHT;
    if (roll < 80) return WIND.MODERATE;
    if (roll < 95) return WIND.STRONG;
    return WIND.SEVERE;
}

function rollSpecialEvent(climate) {
    const roll = Math.random() * 100;
    if (roll < 85) return null;  // 85% chance of no special event
    
    const events = SPECIAL_EVENTS[climate.name.toUpperCase()];
    return events[Math.floor(Math.random() * events.length)];
}

function rollSeasonalEvent(season) {
    const roll = Math.random() * 100;
    if (roll < 90) return null;  // 90% chance of no seasonal event
    
    const events = SEASONAL_EVENTS[season];
    return events ? events[Math.floor(Math.random() * events.length)] : null;
}

function generateWeather(climate, season) {
    return {
        temperature: rollTemperature(climate, season),
        precipitation: rollPrecipitation(),
        wind: rollWind(),
        specialEvent: rollSpecialEvent(climate),
        seasonalEvent: rollSeasonalEvent(season)
    };
}

function displayWeather(weather) {
    console.log('\n' + chalk.bold('🌤  Weather Report 🌤'));
    console.log('═'.repeat(40));
    
    console.log(chalk.cyan('Temperature:'), `${weather.temperature}°F`);
    console.log(chalk.cyan('Precipitation:'), weather.precipitation.name);
    if (weather.precipitation !== PRECIPITATION.NONE) {
        console.log(chalk.dim('Effects:'));
        const effects = weather.precipitation.effects;
        Object.entries(effects).forEach(([key, value]) => {
            console.log(chalk.dim(`  - ${key}: ${value}`));
        });
    }

    console.log(chalk.cyan('\nWind:'), weather.wind.name);
    console.log(chalk.dim(weather.wind.description));
    if (Object.keys(weather.wind.effects).length > 0) {
        console.log(chalk.dim('Effects:'));
        Object.entries(weather.wind.effects).forEach(([key, value]) => {
            console.log(chalk.dim(`  - ${key}: ${value}`));
        });
    }

    if (weather.specialEvent) {
        console.log(chalk.yellow('\n⚡ Special Weather Event ⚡'));
        console.log(chalk.yellow(weather.specialEvent.name));
        console.log(chalk.dim(weather.specialEvent.description));
        console.log(chalk.dim('Effects:'));
        Object.entries(weather.specialEvent.effects).forEach(([key, value]) => {
            console.log(chalk.dim(`  - ${key}: ${value}`));
        });
    }

    if (weather.seasonalEvent) {
        console.log(chalk.magenta('\n🍂 Seasonal Event 🍂'));
        console.log(chalk.magenta(weather.seasonalEvent.name));
        console.log(chalk.dim(weather.seasonalEvent.description));
        console.log(chalk.dim('Effects:'));
        Object.entries(weather.seasonalEvent.effects).forEach(([key, value]) => {
            console.log(chalk.dim(`  - ${key}: ${value}`));
        });
    }
    
    console.log('═'.repeat(40) + '\n');
}

export async function weather() {
    const climate = await selectClimate();
    const season = await selectSeason(climate);
    const weatherData = generateWeather(climate, season);
    displayWeather(weatherData);
    return weatherData;
}
