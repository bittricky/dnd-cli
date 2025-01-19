import { describe, it, expect } from 'vitest';
import {
    generateNPC,
    generatePersonality,
    generateAppearance,
    generateBackground,
    generateMotivation
} from '../src/commands/npc.js';

describe('NPC Generation', () => {
    describe('generatePersonality', () => {
        it('should generate valid personality traits', () => {
            const personality = generatePersonality();
            
            expect(personality).toHaveProperty('trait');
            expect(personality).toHaveProperty('ideal');
            expect(personality).toHaveProperty('bond');
            expect(personality).toHaveProperty('flaw');
            
            Object.values(personality).forEach(trait => {
                expect(typeof trait).toBe('string');
                expect(trait.length).toBeGreaterThan(0);
            });
        });

        it('should generate different personalities on multiple calls', () => {
            const personality1 = generatePersonality();
            const personality2 = generatePersonality();
            
            // At least one trait should be different
            expect(
                personality1.trait !== personality2.trait ||
                personality1.ideal !== personality2.ideal ||
                personality1.bond !== personality2.bond ||
                personality1.flaw !== personality2.flaw
            ).toBe(true);
        });
    });

    describe('generateAppearance', () => {
        it('should generate valid appearance details', () => {
            const appearance = generateAppearance();
            
            expect(appearance).toHaveProperty('height');
            expect(appearance).toHaveProperty('build');
            expect(appearance).toHaveProperty('features');
            expect(appearance).toHaveProperty('clothing');
            
            Object.values(appearance).forEach(detail => {
                expect(typeof detail).toBe('string');
                expect(detail.length).toBeGreaterThan(0);
            });
        });

        it('should consider race in appearance generation', () => {
            const elfAppearance = generateAppearance('elf');
            const dwarfAppearance = generateAppearance('dwarf');
            
            // Race-specific features should be different
            expect(elfAppearance.features).not.toBe(dwarfAppearance.features);
        });
    });

    describe('generateBackground', () => {
        it('should generate valid background information', () => {
            const background = generateBackground();
            
            expect(background).toHaveProperty('occupation');
            expect(background).toHaveProperty('history');
            expect(background).toHaveProperty('alignment');
            
            expect(typeof background.occupation).toBe('string');
            expect(typeof background.history).toBe('string');
            expect(typeof background.alignment).toBe('string');
        });

        it('should generate appropriate occupations for location', () => {
            const cityBackground = generateBackground('city');
            const villageBackground = generateBackground('village');
            
            expect(cityBackground.occupation).not.toBe(villageBackground.occupation);
        });
    });

    describe('generateMotivation', () => {
        it('should generate valid motivations', () => {
            const motivation = generateMotivation();
            
            expect(motivation).toHaveProperty('primary');
            expect(motivation).toHaveProperty('method');
            expect(motivation).toHaveProperty('obstacle');
            
            Object.values(motivation).forEach(detail => {
                expect(typeof detail).toBe('string');
                expect(detail.length).toBeGreaterThan(0);
            });
        });

        it('should generate different motivations on multiple calls', () => {
            const motivation1 = generateMotivation();
            const motivation2 = generateMotivation();
            
            // At least one aspect should be different
            expect(
                motivation1.primary !== motivation2.primary ||
                motivation1.method !== motivation2.method ||
                motivation1.obstacle !== motivation2.obstacle
            ).toBe(true);
        });
    });

    describe('generateNPC', () => {
        it('should generate complete NPC data', () => {
            const npc = generateNPC();
            
            expect(npc).toHaveProperty('name');
            expect(npc).toHaveProperty('race');
            expect(npc).toHaveProperty('gender');
            expect(npc).toHaveProperty('appearance');
            expect(npc).toHaveProperty('personality');
            expect(npc).toHaveProperty('background');
            expect(npc).toHaveProperty('motivation');
            
            expect(typeof npc.name).toBe('string');
            expect(typeof npc.race).toBe('string');
            expect(typeof npc.gender).toBe('string');
        });

        it('should respect provided options', () => {
            const options = {
                race: 'elf',
                gender: 'female',
                location: 'city'
            };
            
            const npc = generateNPC(options);
            
            expect(npc.race).toBe(options.race);
            expect(npc.gender).toBe(options.gender);
            expect(npc.background.location).toBe(options.location);
        });

        it('should handle invalid options', () => {
            expect(() => generateNPC({ race: 'invalid_race' })).toThrow();
            expect(() => generateNPC({ gender: 'invalid_gender' })).toThrow();
        });
    });
});
