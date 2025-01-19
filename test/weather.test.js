import { describe, it, expect, vi } from 'vitest';
import { 
    rollTemperature,
    rollPrecipitation,
    rollWind,
    rollSpecialEvent,
    rollSeasonalEvent,
    generateWeather
} from '../src/commands/weather.js';
import { CLIMATES, PRECIPITATION, WIND } from '../src/data/weather.js';

describe('Weather Generation', () => {
    describe('rollTemperature', () => {
        it('should return temperature within climate range', () => {
            const climate = CLIMATES.TEMPERATE;
            const season = 'SUMMER';
            const temp = rollTemperature(climate, season);
            
            expect(temp).toBeGreaterThanOrEqual(climate.temperatureRange[season].min);
            expect(temp).toBeLessThanOrEqual(climate.temperatureRange[season].max);
        });
    });

    describe('rollPrecipitation', () => {
        it('should return a valid precipitation type', () => {
            const precipitation = rollPrecipitation();
            const validTypes = Object.values(PRECIPITATION);
            
            expect(validTypes).toContain(precipitation);
        });
    });

    describe('rollWind', () => {
        it('should return a valid wind condition', () => {
            const wind = rollWind();
            const validTypes = Object.values(WIND);
            
            expect(validTypes).toContain(wind);
        });
    });

    describe('rollSpecialEvent', () => {
        it('should return null or a valid special event for climate', () => {
            const climate = CLIMATES.TEMPERATE;
            const event = rollSpecialEvent(climate);
            
            if (event) {
                expect(event).toHaveProperty('name');
                expect(event).toHaveProperty('description');
                expect(event).toHaveProperty('effects');
            } else {
                expect(event).toBeNull();
            }
        });
    });

    describe('generateWeather', () => {
        it('should generate complete weather data', () => {
            const climate = CLIMATES.TEMPERATE;
            const season = 'SUMMER';
            const weather = generateWeather(climate, season);
            
            expect(weather).toHaveProperty('temperature');
            expect(weather).toHaveProperty('precipitation');
            expect(weather).toHaveProperty('wind');
            expect(weather).toHaveProperty('specialEvent');
            expect(weather).toHaveProperty('seasonalEvent');
        });
    });
});
