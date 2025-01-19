import { describe, it, expect } from 'vitest';
import {
    calculateEncounterDifficulty,
    calculateXPThresholds,
    generateEncounter,
    adjustXPForGroupSize
} from '../src/commands/encounter.js';

describe('Encounter Generation', () => {
    describe('calculateXPThresholds', () => {
        it('should calculate correct XP thresholds for a level', () => {
            const thresholds = calculateXPThresholds(1);
            expect(thresholds).toHaveProperty('easy');
            expect(thresholds).toHaveProperty('medium');
            expect(thresholds).toHaveProperty('hard');
            expect(thresholds).toHaveProperty('deadly');
            
            expect(thresholds.easy).toBeLessThan(thresholds.medium);
            expect(thresholds.medium).toBeLessThan(thresholds.hard);
            expect(thresholds.hard).toBeLessThan(thresholds.deadly);
        });

        it('should handle invalid levels', () => {
            expect(() => calculateXPThresholds(0)).toThrow();
            expect(() => calculateXPThresholds(21)).toThrow();
        });
    });

    describe('adjustXPForGroupSize', () => {
        it('should adjust XP based on number of monsters', () => {
            const baseXP = 100;
            
            // Single monster should have no multiplier
            expect(adjustXPForGroupSize(baseXP, 1)).toBe(baseXP);
            
            // Multiple monsters should increase XP
            expect(adjustXPForGroupSize(baseXP, 2)).toBeGreaterThan(baseXP);
            expect(adjustXPForGroupSize(baseXP, 7)).toBeGreaterThan(adjustXPForGroupSize(baseXP, 2));
        });

        it('should handle edge cases', () => {
            expect(adjustXPForGroupSize(0, 1)).toBe(0);
            expect(() => adjustXPForGroupSize(100, 0)).toThrow();
        });
    });

    describe('calculateEncounterDifficulty', () => {
        const partyLevels = [1, 1, 1, 1];  // 4 level 1 characters
        
        it('should calculate encounter difficulty correctly', () => {
            const easyEncounter = calculateEncounterDifficulty(partyLevels, 100);
            const hardEncounter = calculateEncounterDifficulty(partyLevels, 400);
            
            expect(easyEncounter).toBe('easy');
            expect(hardEncounter).toBe('hard');
        });

        it('should handle edge cases', () => {
            expect(calculateEncounterDifficulty(partyLevels, 0)).toBe('trivial');
            expect(calculateEncounterDifficulty(partyLevels, 1600)).toBe('deadly');
        });
    });

    describe('generateEncounter', () => {
        const partyLevels = [3, 3, 3, 3];  // 4 level 3 characters
        const difficulty = 'medium';
        
        it('should generate a valid encounter', () => {
            const encounter = generateEncounter(partyLevels, difficulty);
            
            expect(encounter).toHaveProperty('monsters');
            expect(encounter).toHaveProperty('totalXP');
            expect(encounter).toHaveProperty('adjustedXP');
            expect(encounter).toHaveProperty('difficulty');
            
            expect(encounter.monsters.length).toBeGreaterThan(0);
            expect(encounter.totalXP).toBeGreaterThan(0);
            expect(encounter.adjustedXP).toBeGreaterThanOrEqual(encounter.totalXP);
            expect(['trivial', 'easy', 'medium', 'hard', 'deadly']).toContain(encounter.difficulty);
        });

        it('should handle invalid difficulties', () => {
            expect(() => generateEncounter(partyLevels, 'impossible')).toThrow();
        });

        it('should handle invalid party levels', () => {
            expect(() => generateEncounter([], 'medium')).toThrow();
            expect(() => generateEncounter([0, 1, 2], 'medium')).toThrow();
        });
    });
});
