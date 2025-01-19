import { describe, it, expect } from 'vitest';
import { 
    rollOnWildMagicTable,
    getWildMagicEffect,
    shouldTriggerSurge
} from '../src/commands/wildmagic.js';

describe('Wild Magic', () => {
    describe('rollOnWildMagicTable', () => {
        it('should return a valid effect from the table', () => {
            const effect = rollOnWildMagicTable();
            expect(effect).toHaveProperty('id');
            expect(effect).toHaveProperty('effect');
        });

        it('should return different effects on multiple rolls', () => {
            const rolls = new Set();
            for (let i = 0; i < 10; i++) {
                const effect = rollOnWildMagicTable();
                rolls.add(effect.id);
            }
            // With 10 rolls, we should get at least a few different results
            expect(rolls.size).toBeGreaterThan(1);
        });
    });

    describe('getWildMagicEffect', () => {
        it('should return a specific effect by ID', () => {
            const effect = getWildMagicEffect(1);
            expect(effect).toHaveProperty('id', 1);
            expect(effect).toHaveProperty('effect');
        });

        it('should handle invalid IDs', () => {
            expect(() => getWildMagicEffect(0)).toThrow();
            expect(() => getWildMagicEffect(101)).toThrow();
        });
    });

    describe('shouldTriggerSurge', () => {
        it('should have correct trigger rate for standard mode', () => {
            const triggerCount = Array(100).fill(0)
                .map(() => shouldTriggerSurge('standard'))
                .filter(Boolean).length;
            
            // With standard mode (1 in 20), expect roughly 5% trigger rate
            expect(triggerCount).toBeLessThanOrEqual(15); // Allow some variance
            expect(triggerCount).toBeGreaterThanOrEqual(0);
        });

        it('should always trigger in critical mode', () => {
            expect(shouldTriggerSurge('critical')).toBe(true);
        });

        it('should handle invalid modes', () => {
            expect(() => shouldTriggerSurge('invalid')).toThrow();
        });
    });
});
