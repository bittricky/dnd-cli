import { describe, it, expect } from 'vitest';
import {
    generateLoot,
    rollTreasure,
    calculateHoardValue,
    generateMagicItems,
    generateHoard
} from '../src/commands/loot.js';

describe('Loot Generation', () => {
    describe('rollTreasure', () => {
        it('should generate treasure within CR range', () => {
            const cr = 5;
            const treasure = rollTreasure(cr);
            
            expect(treasure).toHaveProperty('copper');
            expect(treasure).toHaveProperty('silver');
            expect(treasure).toHaveProperty('electrum');
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
            expect(() => rollTreasure('invalid')).toThrow();
        });

        it('should handle fractional CR values', () => {
            const treasure = rollTreasure('1/2');
            expect(treasure).toBeDefined();
            Object.values(treasure).forEach(value => {
                expect(value).toBeGreaterThanOrEqual(0);
            });
        });
    });

    describe('calculateHoardValue', () => {
        it('should calculate correct total value in gold', () => {
            const hoard = {
                copper: 1000,    // 10 gold
                silver: 1000,    // 100 gold
                electrum: 200,   // 100 gold
                gold: 100,       // 100 gold
                platinum: 10     // 100 gold
            };
            
            const totalGold = calculateHoardValue(hoard);
            expect(totalGold).toBe(410);
        });

        it('should handle empty hoard', () => {
            const emptyHoard = {
                copper: 0,
                silver: 0,
                electrum: 0,
                gold: 0,
                platinum: 0
            };
            
            expect(calculateHoardValue(emptyHoard)).toBe(0);
        });

        it('should handle missing properties', () => {
            const partialHoard = {
                gold: 100
            };
            
            expect(calculateHoardValue(partialHoard)).toBe(100);
        });
    });

    describe('generateMagicItems', () => {
        it('should generate correct number of items', () => {
            const table = 'A';
            const count = 3;
            const items = generateMagicItems(table, count);
            
            expect(items).toHaveLength(count);
            items.forEach(item => {
                expect(typeof item).toBe('string');
                expect(item.length).toBeGreaterThan(0);
            });
        });

        it('should throw error for invalid table', () => {
            expect(() => generateMagicItems('InvalidTable', 1)).toThrow();
        });

        it('should generate different items on multiple calls', () => {
            const items1 = generateMagicItems('A', 5);
            const items2 = generateMagicItems('A', 5);
            
            // At least one item should be different
            expect(items1.join(',')).not.toBe(items2.join(','));
        });
    });

    describe('generateHoard', () => {
        it('should generate valid hoard for CR range', () => {
            const cr = 5;
            const hoard = generateHoard(cr);
            
            expect(hoard).toHaveProperty('coins');
            expect(hoard).toHaveProperty('valuables');
            expect(hoard).toHaveProperty('magicItems');
            expect(hoard).toHaveProperty('totalValue');
            
            expect(typeof hoard.totalValue).toBe('number');
            expect(hoard.totalValue).toBeGreaterThanOrEqual(0);
            
            expect(Array.isArray(hoard.valuables)).toBe(true);
            expect(Array.isArray(hoard.magicItems)).toBe(true);
            
            hoard.valuables.forEach(valuable => {
                expect(valuable).toHaveProperty('type');
                expect(valuable).toHaveProperty('value');
                expect(valuable).toHaveProperty('description');
                expect(['gem', 'art']).toContain(valuable.type);
            });
        });

        it('should generate different hoards on multiple calls', () => {
            const hoard1 = generateHoard(5);
            const hoard2 = generateHoard(5);
            
            expect(
                hoard1.totalValue !== hoard2.totalValue ||
                hoard1.valuables.length !== hoard2.valuables.length ||
                hoard1.magicItems.length !== hoard2.magicItems.length
            ).toBe(true);
        });

        it('should handle different CR ranges', () => {
            const lowCR = generateHoard(4);
            const midCR = generateHoard(10);
            const highCR = generateHoard(17);
            
            // Higher CR should generally yield more valuable hoards
            expect(highCR.totalValue).toBeGreaterThan(lowCR.totalValue);
        });
    });
});
