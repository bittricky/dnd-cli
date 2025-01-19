import { describe, it, expect } from 'vitest';
import {
    generateLoot,
    rollTreasure,
    calculateHoardValue,
    generateMagicItems
} from '../src/commands/loot.js';

describe('Loot Generation', () => {
    describe('rollTreasure', () => {
        it('should generate treasure within CR range', () => {
            const cr = 5;
            const treasure = rollTreasure(cr);
            
            expect(treasure).toHaveProperty('copper');
            expect(treasure).toHaveProperty('silver');
            expect(treasure).toHaveProperty('gold');
            expect(treasure).toHaveProperty('platinum');
            
            // All values should be non-negative
            Object.values(treasure).forEach(value => {
                expect(value).toBeGreaterThanOrEqual(0);
            });
        });

        it('should handle invalid CR values', () => {
            expect(() => rollTreasure(-1)).toThrow();
            expect(() => rollTreasure(31)).toThrow();
        });
    });

    describe('calculateHoardValue', () => {
        it('should calculate correct total value in gold', () => {
            const hoard = {
                copper: 1000,    // 10 gold
                silver: 1000,    // 100 gold
                gold: 100,       // 100 gold
                platinum: 10     // 100 gold
            };
            
            const totalGold = calculateHoardValue(hoard);
            expect(totalGold).toBe(310);
        });

        it('should handle empty hoard', () => {
            const emptyHoard = {
                copper: 0,
                silver: 0,
                gold: 0,
                platinum: 0
            };
            
            expect(calculateHoardValue(emptyHoard)).toBe(0);
        });
    });

    describe('generateMagicItems', () => {
        it('should generate appropriate magic items for CR', () => {
            const cr = 10;
            const items = generateMagicItems(cr);
            
            expect(Array.isArray(items)).toBe(true);
            items.forEach(item => {
                expect(item).toHaveProperty('name');
                expect(item).toHaveProperty('rarity');
                expect(item).toHaveProperty('type');
            });
        });

        it('should generate more valuable items for higher CR', () => {
            const lowCrItems = generateMagicItems(5);
            const highCrItems = generateMagicItems(20);
            
            // Higher CR should generally yield more or better items
            expect(
                highCrItems.length > lowCrItems.length ||
                highCrItems.some(item => ['very rare', 'legendary'].includes(item.rarity))
            ).toBe(true);
        });
    });

    describe('generateLoot', () => {
        it('should generate complete loot table', () => {
            const cr = 8;
            const loot = generateLoot(cr);
            
            expect(loot).toHaveProperty('treasure');
            expect(loot).toHaveProperty('magicItems');
            expect(loot).toHaveProperty('totalValue');
            
            expect(loot.treasure).toHaveProperty('gold');
            expect(Array.isArray(loot.magicItems)).toBe(true);
            expect(typeof loot.totalValue).toBe('number');
        });

        it('should handle different encounter types', () => {
            const individual = generateLoot(5, 'individual');
            const hoard = generateLoot(5, 'hoard');
            
            // Hoards should generally be more valuable
            expect(hoard.totalValue).toBeGreaterThan(individual.totalValue);
        });

        it('should handle invalid inputs', () => {
            expect(() => generateLoot(-1)).toThrow();
            expect(() => generateLoot(5, 'invalid_type')).toThrow();
        });
    });
});
