import { describe, it, expect, vi } from 'vitest';
import {
    createCombatState,
    rollD20,
    rollInitiative,
    rollSpeedFactorInitiative,
    createCombatant,
    addCombatant,
    removeCombatant,
    sortCombatants,
    nextTurn,
    addCondition,
    removeCondition,
    updateConditions,
} from '../src/commands/initiative.js';

describe('Initiative Tracker', () => {
    describe('createCombatState', () => {
        it('should create initial combat state with default variant', () => {
            const state = createCombatState();
            expect(state).toEqual({
                variant: 'STANDARD',
                combatants: [],
                round: 1,
                currentTurn: 0,
            });
        });

        it('should create combat state with specified variant', () => {
            const state = createCombatState('SPEED_FACTOR');
            expect(state.variant).toBe('SPEED_FACTOR');
        });
    });

    describe('rollD20', () => {
        it('should roll within valid range', () => {
            const roll = rollD20();
            expect(roll).toBeGreaterThanOrEqual(1);
            expect(roll).toBeLessThanOrEqual(20);
        });
    });

    describe('rollInitiative', () => {
        it('should roll normal initiative within valid range', () => {
            const roll = rollInitiative(2);
            expect(roll).toBeGreaterThanOrEqual(3);  // 1 + 2
            expect(roll).toBeLessThanOrEqual(22);    // 20 + 2
        });

        it('should handle advantage correctly', () => {
            vi.spyOn(Math, 'random')
                .mockReturnValueOnce(0.5)  // 11
                .mockReturnValueOnce(0.75); // 16

            const roll = rollInitiative(2, true);
            expect(roll).toBe(18); // 16 + 2
            vi.restoreAllMocks();
        });

        it('should handle negative modifiers', () => {
            const roll = rollInitiative(-2);
            expect(roll).toBeGreaterThanOrEqual(-1); // 1 - 2
            expect(roll).toBeLessThanOrEqual(18);    // 20 - 2
        });
    });

    describe('rollSpeedFactorInitiative', () => {
        it('should calculate speed factor initiative correctly', () => {
            vi.spyOn(Math, 'random').mockReturnValue(0.5); // 11
            
            const roll = rollSpeedFactorInitiative(2, 'LIGHT', 'MELEE');
            expect(roll).toBe(15); // 11 + 2 (dex) + 2 (light weapon) + 0 (melee)
            
            vi.restoreAllMocks();
        });

        it('should handle spell levels', () => {
            vi.spyOn(Math, 'random').mockReturnValue(0.5); // 11
            
            const roll = rollSpeedFactorInitiative(2, 'NORMAL', 'SPELL', 3);
            expect(roll).toBe(10); // 11 + 2 (dex) + 0 (normal weapon) - 3 (level 3 spell)
            
            vi.restoreAllMocks();
        });
    });

    describe('createCombatant', () => {
        it('should create a combatant with default values', () => {
            const combatant = createCombatant('Fighter', 15);
            expect(combatant).toEqual({
                name: 'Fighter',
                initiative: 15,
                dexMod: 0,
                type: 'PC',
                conditions: [],
            });
        });

        it('should create a combatant with custom values', () => {
            const combatant = createCombatant('Goblin', 12, -1, 'NPC');
            expect(combatant).toEqual({
                name: 'Goblin',
                initiative: 12,
                dexMod: -1,
                type: 'NPC',
                conditions: [],
            });
        });
    });

    describe('Combat Management', () => {
        let state;

        beforeEach(() => {
            state = createCombatState();
        });

        it('should add combatants correctly', () => {
            const { newState } = addCombatant(state, createCombatant('Fighter', 15));
            expect(newState.combatants).toHaveLength(1);
            expect(newState.combatants[0].name).toBe('Fighter');
        });

        it('should remove combatants correctly', () => {
            let { newState } = addCombatant(state, createCombatant('Fighter', 15));
            newState = removeCombatant(newState, 'Fighter').newState;
            expect(newState.combatants).toHaveLength(0);
        });

        it('should sort combatants by initiative', () => {
            const combatants = [
                createCombatant('A', 15),
                createCombatant('B', 20),
                createCombatant('C', 10),
            ];
            const sorted = sortCombatants(combatants);
            expect(sorted[0].name).toBe('B');
            expect(sorted[2].name).toBe('C');
        });

        it('should advance turns correctly', () => {
            let { newState } = addCombatant(state, createCombatant('Fighter', 15));
            newState = addCombatant(newState, createCombatant('Wizard', 12)).newState;
            
            // First turn
            expect(newState.currentTurn).toBe(0);
            expect(newState.round).toBe(1);
            
            // Next turn
            newState = nextTurn(newState).newState;
            expect(newState.currentTurn).toBe(1);
            expect(newState.round).toBe(1);
            
            // Next turn (should wrap to next round)
            newState = nextTurn(newState).newState;
            expect(newState.currentTurn).toBe(0);
            expect(newState.round).toBe(2);
        });
    });

    describe('Condition Management', () => {
        let state;

        beforeEach(() => {
            state = createCombatState();
            state = addCombatant(state, createCombatant('Fighter', 15)).newState;
        });

        it('should add conditions correctly', () => {
            const { newState } = addCondition(state, 'Fighter', 'Poisoned', 3);
            expect(newState.combatants[0].conditions).toContainEqual({
                name: 'Poisoned',
                duration: 3,
            });
        });

        it('should remove conditions correctly', () => {
            let { newState } = addCondition(state, 'Fighter', 'Poisoned', 3);
            newState = removeCondition(newState, 'Fighter', 'Poisoned').newState;
            expect(newState.combatants[0].conditions).toHaveLength(0);
        });

        it('should update condition durations', () => {
            let { newState } = addCondition(state, 'Fighter', 'Poisoned', 2);
            newState = updateConditions(newState).newState;
            expect(newState.combatants[0].conditions[0].duration).toBe(1);
            
            newState = updateConditions(newState).newState;
            expect(newState.combatants[0].conditions).toHaveLength(0);
        });

        it('should handle permanent conditions', () => {
            const { newState } = addCondition(state, 'Fighter', 'Cursed', null);
            expect(newState.combatants[0].conditions[0].duration).toBeNull();
            
            const updatedState = updateConditions(newState).newState;
            expect(updatedState.combatants[0].conditions).toHaveLength(1);
        });
    });
});
