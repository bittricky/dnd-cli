import { describe, it, expect } from 'vitest';
import {
    rollAbilityScores,
    calculateModifier,
    generateCharacterStats,
    calculateProficiencyBonus
} from '../src/commands/character.js';

describe('Character Generation', () => {
    describe('rollAbilityScores', () => {
        it('should generate 6 ability scores', () => {
            const scores = rollAbilityScores();
            expect(scores).toHaveLength(6);
        });

        it('should generate scores between 3 and 18', () => {
            const scores = rollAbilityScores();
            scores.forEach(score => {
                expect(score).toBeGreaterThanOrEqual(3);
                expect(score).toBeLessThanOrEqual(18);
            });
        });
    });

    describe('calculateModifier', () => {
        it('should calculate correct ability modifiers', () => {
            expect(calculateModifier(1)).toBe(-5);
            expect(calculateModifier(10)).toBe(0);
            expect(calculateModifier(15)).toBe(2);
            expect(calculateModifier(20)).toBe(5);
        });

        it('should handle edge cases', () => {
            expect(calculateModifier(0)).toBe(-5);
            expect(calculateModifier(30)).toBe(10);
        });
    });

    describe('calculateProficiencyBonus', () => {
        it('should calculate correct proficiency bonus for different levels', () => {
            expect(calculateProficiencyBonus(1)).toBe(2);
            expect(calculateProficiencyBonus(5)).toBe(3);
            expect(calculateProficiencyBonus(9)).toBe(4);
            expect(calculateProficiencyBonus(13)).toBe(5);
            expect(calculateProficiencyBonus(17)).toBe(6);
        });

        it('should handle invalid levels', () => {
            expect(() => calculateProficiencyBonus(0)).toThrow();
            expect(() => calculateProficiencyBonus(21)).toThrow();
        });
    });

    describe('generateCharacterStats', () => {
        it('should generate complete character stats', () => {
            const stats = generateCharacterStats();
            
            expect(stats).toHaveProperty('abilityScores');
            expect(stats.abilityScores).toHaveLength(6);
            
            expect(stats).toHaveProperty('modifiers');
            expect(Object.keys(stats.modifiers)).toHaveLength(6);
            
            Object.values(stats.modifiers).forEach(modifier => {
                expect(modifier).toBeGreaterThanOrEqual(-5);
                expect(modifier).toBeLessThanOrEqual(5);
            });
        });
    });
});
