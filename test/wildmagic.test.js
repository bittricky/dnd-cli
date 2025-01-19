import { describe, it, expect } from 'vitest';
import { 
    createWildMagicState,
    checkForSurge,
    getSurgeEffect,
    rollD20,
    rollD100
} from '../src/commands/wildmagic.js';

describe('Wild Magic', () => {
    describe('createWildMagicState', () => {
        it('should create initial state', () => {
            const state = createWildMagicState();
            expect(state).toHaveProperty('surgeCount', 0);
            expect(state).toHaveProperty('spellsCast', 0);
            expect(state).toHaveProperty('currentThreshold', 1);
            expect(state).toHaveProperty('triggerType', 'STANDARD');
        });
    });

    describe('checkForSurge', () => {
        it('should check surge in standard mode', () => {
            const state = createWildMagicState();
            const { newState, triggered } = checkForSurge(state);
            
            expect(newState.spellsCast).toBe(1);
            expect(typeof triggered).toBe('boolean');
        });

        it('should handle spell level mode', () => {
            const state = {
                ...createWildMagicState(),
                triggerType: 'SPELL_LEVEL'
            };
            
            const spellLevel = 3;
            const { newState, triggered } = checkForSurge(state, spellLevel);
            
            expect(newState.spellsCast).toBe(1);
            expect(typeof triggered).toBe('boolean');
        });

        it('should handle escalating mode', () => {
            const state = {
                ...createWildMagicState(),
                triggerType: 'ESCALATING',
                currentThreshold: 2
            };
            
            const { newState, triggered } = checkForSurge(state);
            
            if (triggered) {
                expect(newState.currentThreshold).toBe(1);
            } else {
                expect(newState.currentThreshold).toBeGreaterThan(2);
            }
        });
    });

    describe('getSurgeEffect', () => {
        it('should return effect and update surge count', () => {
            const state = createWildMagicState();
            const { newState, effect, roll } = getSurgeEffect(state);
            
            expect(newState.surgeCount).toBe(1);
            expect(effect).toHaveProperty('effect');
            expect(roll).toBeGreaterThanOrEqual(1);
            expect(roll).toBeLessThanOrEqual(100);
        });

        it('should return different effects on multiple rolls', () => {
            const state = createWildMagicState();
            const effects = new Set();
            
            for (let i = 0; i < 10; i++) {
                const { effect } = getSurgeEffect(state);
                effects.add(effect.effect);
            }
            
            expect(effects.size).toBeGreaterThan(1);
        });
    });

    describe('dice rolling', () => {
        describe('rollD20', () => {
            it('should roll within valid range', () => {
                for (let i = 0; i < 100; i++) {
                    const roll = rollD20();
                    expect(roll).toBeGreaterThanOrEqual(1);
                    expect(roll).toBeLessThanOrEqual(20);
                }
            });
        });

        describe('rollD100', () => {
            it('should roll within valid range', () => {
                for (let i = 0; i < 100; i++) {
                    const roll = rollD100();
                    expect(roll).toBeGreaterThanOrEqual(1);
                    expect(roll).toBeLessThanOrEqual(100);
                }
            });
        });
    });
});
