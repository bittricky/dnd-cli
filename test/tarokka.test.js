import { describe, it, expect } from 'vitest';
import { 
    createDeck,
    shuffleDeck,
    drawCard,
    getCardMeaning,
    performReading
} from '../src/commands/tarokka.js';

describe('Tarokka Deck', () => {
    describe('createDeck', () => {
        it('should create a deck with all cards', () => {
            const deck = createDeck();
            expect(deck.length).toBeGreaterThan(0);
            expect(deck[0]).toHaveProperty('id');
            expect(deck[0]).toHaveProperty('name');
        });
    });

    describe('shuffleDeck', () => {
        it('should return a new shuffled deck with all cards', () => {
            const deck = createDeck();
            const shuffled = shuffleDeck(deck);
            const originalLength = shuffled.length;
            const uniqueCards = new Set(shuffled.map(card => card.id));
            
            expect(shuffled.length).toBe(originalLength);
            expect(uniqueCards.size).toBe(originalLength);
            expect(shuffled).not.toEqual(deck); // Should be different order
        });

        it('should produce different orders on multiple shuffles', () => {
            const deck = createDeck();
            const shuffled1 = shuffleDeck(deck);
            const shuffled2 = shuffleDeck(deck);
            
            let differences = 0;
            for (let i = 0; i < shuffled1.length; i++) {
                if (shuffled1[i].id !== shuffled2[i].id) differences++;
            }
            
            expect(differences).toBeGreaterThan(shuffled1.length * 0.5);
        });
    });

    describe('drawCard', () => {
        it('should return a card and new deck state', () => {
            const deck = createDeck();
            const originalLength = deck.length;
            const { card, newDeck } = drawCard(deck);
            
            expect(card).toHaveProperty('id');
            expect(card).toHaveProperty('name');
            expect(newDeck.length).toBe(originalLength - 1);
            expect(newDeck).not.toContainEqual(card);
        });

        it('should throw error when deck is empty', () => {
            const emptyDeck = [];
            expect(() => drawCard(emptyDeck)).toThrow();
        });
    });

    describe('getCardMeaning', () => {
        it('should return valid meaning for high deck cards', () => {
            const card = { id: 1, name: 'Avenger', deck: 'high' };
            const meaning = getCardMeaning(card);
            expect(meaning).toBeTruthy();
            expect(typeof meaning).toBe('string');
        });

        it('should return valid meaning for common deck cards', () => {
            const card = { id: 1, name: 'Stars', deck: 'common' };
            const meaning = getCardMeaning(card);
            expect(meaning).toBeTruthy();
            expect(typeof meaning).toBe('string');
        });
    });

    describe('performReading', () => {
        it('should perform a complete reading', () => {
            const reading = performReading();
            expect(reading).toHaveLength(5);
            expect(reading[0]).toHaveProperty('card');
            expect(reading[0]).toHaveProperty('position');
            expect(reading[0]).toHaveProperty('meaning');
        });

        it('should have unique cards in reading', () => {
            const reading = performReading();
            const uniqueCards = new Set(reading.map(r => r.card.id));
            expect(uniqueCards.size).toBe(5);
        });
    });
});
