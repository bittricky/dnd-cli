import { describe, it, expect } from 'vitest';
import {
    createCombatState,
    rollInitiative,
    sortByInitiative,
    addCombatant,
    removeCombatant,
    advanceRound,
    getCurrentTurn
} from '../src/commands/initiative.js';

describe('Initiative Tracker', () => {
    describe('createCombatState', () => {
        it('should create initial combat state', () => {
            const state = createCombatState();
            expect(state).toHaveProperty('combatants');
            expect(state).toHaveProperty('round');
            expect(state).toHaveProperty('currentTurn');
            expect(state.combatants).toEqual([]);
            expect(state.round).toBe(1);
            expect(state.currentTurn).toBe(0);
        });
    });

    describe('rollInitiative', () => {
        it('should roll initiative within valid range', () => {
            const modifier = 2;
            const roll = rollInitiative(modifier);
            
            expect(roll).toBeGreaterThanOrEqual(3);  // 1 + 2
            expect(roll).toBeLessThanOrEqual(22);    // 20 + 2
        });

        it('should handle negative modifiers', () => {
            const modifier = -2;
            const roll = rollInitiative(modifier);
            
            expect(roll).toBeGreaterThanOrEqual(-1);  // 1 - 2
            expect(roll).toBeLessThanOrEqual(18);     // 20 - 2
        });
    });

    describe('sortByInitiative', () => {
        it('should sort combatants by initiative in descending order', () => {
            const combatants = [
                { name: 'A', initiative: 15 },
                { name: 'B', initiative: 20 },
                { name: 'C', initiative: 10 }
            ];
            
            const sorted = sortByInitiative(combatants);
            expect(sorted[0].initiative).toBe(20);
            expect(sorted[1].initiative).toBe(15);
            expect(sorted[2].initiative).toBe(10);
        });

        it('should handle ties using dexterity modifier', () => {
            const combatants = [
                { name: 'A', initiative: 15, dexMod: 2 },
                { name: 'B', initiative: 15, dexMod: 3 },
                { name: 'C', initiative: 15, dexMod: 1 }
            ];
            
            const sorted = sortByInitiative(combatants);
            expect(sorted[0].dexMod).toBe(3);
            expect(sorted[1].dexMod).toBe(2);
            expect(sorted[2].dexMod).toBe(1);
        });
    });

    describe('addCombatant', () => {
        it('should add combatant to state', () => {
            const state = createCombatState();
            const { newState } = addCombatant(state, {
                name: 'Fighter',
                initiative: 15,
                dexMod: 2
            });
            
            expect(newState.combatants).toHaveLength(1);
            expect(newState.combatants[0].name).toBe('Fighter');
        });

        it('should maintain initiative order when adding multiple combatants', () => {
            let state = createCombatState();
            const combatants = [
                { name: 'A', initiative: 10 },
                { name: 'B', initiative: 20 },
                { name: 'C', initiative: 15 }
            ];

            for (const c of combatants) {
                const { newState } = addCombatant(state, c);
                state = newState;
            }

            expect(state.combatants[0].initiative).toBe(20);
            expect(state.combatants[1].initiative).toBe(15);
            expect(state.combatants[2].initiative).toBe(10);
        });
    });

    describe('removeCombatant', () => {
        it('should remove combatant from state', () => {
            let state = createCombatState();
            const { newState: stateWithCombatant } = addCombatant(state, {
                name: 'Fighter',
                initiative: 15
            });
            
            const { newState } = removeCombatant(stateWithCombatant, 'Fighter');
            expect(newState.combatants).toHaveLength(0);
        });

        it('should handle removing non-existent combatant', () => {
            const state = createCombatState();
            const { newState } = removeCombatant(state, 'NonExistent');
            expect(newState).toEqual(state);
        });
    });

    describe('advanceRound', () => {
        it('should increment round and reset turn order', () => {
            let state = createCombatState();
            state.round = 1;
            state.currentTurn = 3;
            
            const { newState } = advanceRound(state);
            expect(newState.round).toBe(2);
            expect(newState.currentTurn).toBe(0);
        });
    });

    describe('getCurrentTurn', () => {
        it('should return current combatant', () => {
            let state = createCombatState();
            const { newState } = addCombatant(state, {
                name: 'Fighter',
                initiative: 15
            });
            
            const current = getCurrentTurn(newState);
            expect(current).toBeTruthy();
            expect(current.name).toBe('Fighter');
        });

        it('should return null when no combatants', () => {
            const state = createCombatState();
            const current = getCurrentTurn(state);
            expect(current).toBeNull();
        });
    });
});
