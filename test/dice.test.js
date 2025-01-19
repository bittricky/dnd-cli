import { describe, it, expect } from 'vitest';
import { rollDice, parseRollString } from '../src/commands/dice.js';

describe('Dice Rolling', () => {
    describe('parseRollString', () => {
        it('should parse basic roll strings', () => {
            expect(parseRollString('1d20')).toEqual({ count: 1, sides: 20, modifier: 0 });
            expect(parseRollString('2d6')).toEqual({ count: 2, sides: 6, modifier: 0 });
        });

        it('should parse roll strings with modifiers', () => {
            expect(parseRollString('1d20+5')).toEqual({ count: 1, sides: 20, modifier: 5 });
            expect(parseRollString('2d6-2')).toEqual({ count: 2, sides: 6, modifier: -2 });
        });

        it('should handle invalid roll strings', () => {
            expect(() => parseRollString('invalid')).toThrow();
            expect(() => parseRollString('d20')).toThrow();
            expect(() => parseRollString('1d')).toThrow();
        });
    });

    describe('rollDice', () => {
        it('should return a number within valid range for 1d20', () => {
            const result = rollDice(1, 20, 0);
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(20);
        });

        it('should apply modifiers correctly', () => {
            const result = rollDice(1, 20, 5);
            expect(result).toBeGreaterThanOrEqual(6); // 1 + 5
            expect(result).toBeLessThanOrEqual(25); // 20 + 5
        });

        it('should handle multiple dice', () => {
            const result = rollDice(2, 6, 0);
            expect(result).toBeGreaterThanOrEqual(2); // 1 + 1
            expect(result).toBeLessThanOrEqual(12); // 6 + 6
        });
    });
});
