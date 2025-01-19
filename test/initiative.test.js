import { describe, it, expect } from 'vitest';
import {
    rollInitiative,
    sortByInitiative,
    addCombatant,
    removeCombatant,
    advanceRound
} from '../src/commands/initiative.js';

describe('Initiative Tracker', () => {
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
        it('should add a new combatant with valid properties', () => {
            const combatants = [];
            const newCombatant = {
                name: 'Fighter',
                initiative: 15,
                dexMod: 2,
                hp: 20,
                maxHp: 20
            };
            
            const updated = addCombatant(combatants, newCombatant);
            expect(updated).toHaveLength(1);
            expect(updated[0]).toMatchObject(newCombatant);
        });

        it('should validate required properties', () => {
            const combatants = [];
            const invalidCombatant = { name: 'Invalid' };
            
            expect(() => addCombatant(combatants, invalidCombatant)).toThrow();
        });
    });

    describe('removeCombatant', () => {
        it('should remove a combatant by name', () => {
            const combatants = [
                { name: 'A', initiative: 15 },
                { name: 'B', initiative: 10 }
            ];
            
            const updated = removeCombatant(combatants, 'A');
            expect(updated).toHaveLength(1);
            expect(updated[0].name).toBe('B');
        });

        it('should handle non-existent combatant', () => {
            const combatants = [{ name: 'A', initiative: 15 }];
            expect(() => removeCombatant(combatants, 'NonExistent')).toThrow();
        });
    });

    describe('advanceRound', () => {
        it('should increment round counter', () => {
            const state = { round: 1, currentTurn: 0 };
            const updated = advanceRound(state);
            expect(updated.round).toBe(2);
        });

        it('should reset current turn', () => {
            const state = { round: 1, currentTurn: 5 };
            const updated = advanceRound(state);
            expect(updated.currentTurn).toBe(0);
        });
    });
});
