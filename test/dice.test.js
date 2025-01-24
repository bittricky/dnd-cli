import { describe, it, expect, vi } from 'vitest';
import { rollDie, parseRollString, rollDiceWithModifier, rollWithAdvantage, rollWithDisadvantage } from '../src/commands/dice.js';

describe('Dice Rolling', () => {
    describe('rollDie', () => {
        it('should return a number within valid range', () => {
            const result = rollDie(20);
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(20);
        });

        it('should throw error for invalid sides', () => {
            expect(() => rollDie(0)).toThrow('Invalid number of sides');
            expect(() => rollDie(-1)).toThrow('Invalid number of sides');
            expect(() => rollDie(1)).toThrow('Invalid number of sides');
        });
    });

    describe('parseRollString', () => {
        it('should parse basic roll strings', () => {
            expect(parseRollString('1d20')).toEqual({ count: 1, sides: 20, modifier: 0, advantage: false, disadvantage: false });
            expect(parseRollString('2d6')).toEqual({ count: 2, sides: 6, modifier: 0, advantage: false, disadvantage: false });
        });

        it('should parse roll strings with modifiers', () => {
            expect(parseRollString('1d20+5')).toEqual({ count: 1, sides: 20, modifier: 5, advantage: false, disadvantage: false });
            expect(parseRollString('2d6-2')).toEqual({ count: 2, sides: 6, modifier: -2, advantage: false, disadvantage: false });
        });

        it('should parse advantage and disadvantage', () => {
            expect(parseRollString('1d20adv')).toEqual({ count: 1, sides: 20, modifier: 0, advantage: true, disadvantage: false });
            expect(parseRollString('1d20dis')).toEqual({ count: 1, sides: 20, modifier: 0, advantage: false, disadvantage: true });
        });

        it('should parse complex expressions', () => {
            expect(parseRollString('2d6+1d4+3')).toEqual([
                { count: 2, sides: 6, modifier: 0, advantage: false, disadvantage: false },
                { count: 1, sides: 4, modifier: 3, advantage: false, disadvantage: false }
            ]);
        });

        it('should handle invalid roll strings', () => {
            expect(() => parseRollString('invalid')).toThrow('Invalid roll string format');
            expect(() => parseRollString('d20')).toThrow('Invalid roll string format');
            expect(() => parseRollString('1d')).toThrow('Invalid roll string format');
            expect(() => parseRollString('1d20adv+dis')).toThrow('Cannot have both advantage and disadvantage');
        });
    });

    describe('rollDiceWithModifier', () => {
        it('should roll correct number of dice and apply modifier', () => {
            const rolls = rollDiceWithModifier(2, 6, 3);
            expect(rolls.total).toBeGreaterThanOrEqual(5); // (1 + 1) + 3
            expect(rolls.total).toBeLessThanOrEqual(15); // (6 + 6) + 3
            expect(rolls.rolls).toHaveLength(2);
            expect(rolls.modifier).toBe(3);
        });

        it('should handle negative modifiers', () => {
            const rolls = rollDiceWithModifier(1, 20, -2);
            expect(rolls.total).toBeGreaterThanOrEqual(-1); // 1 - 2
            expect(rolls.total).toBeLessThanOrEqual(18); // 20 - 2
            expect(rolls.rolls).toHaveLength(1);
            expect(rolls.modifier).toBe(-2);
        });
    });

    describe('rollWithAdvantage', () => {
        it('should take higher of two d20 rolls', () => {
            vi.spyOn(Math, 'random')
                .mockReturnValueOnce(0.5) // 11
                .mockReturnValueOnce(0.75); // 16
            
            const result = rollWithAdvantage();
            expect(result.total).toBe(16);
            expect(result.rolls).toHaveLength(2);
            expect(result.advantage).toBe(true);
            vi.restoreAllMocks();
        });
    });

    describe('rollWithDisadvantage', () => {
        it('should take lower of two d20 rolls', () => {
            vi.spyOn(Math, 'random')
                .mockReturnValueOnce(0.5) // 11
                .mockReturnValueOnce(0.75); // 16
            
            const result = rollWithDisadvantage();
            expect(result.total).toBe(11);
            expect(result.rolls).toHaveLength(2);
            expect(result.disadvantage).toBe(true);
            vi.restoreAllMocks();
        });
    });
});
