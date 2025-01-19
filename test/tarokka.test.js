import { describe, it, expect } from 'vitest';
import { 
    drawCard,
    shuffleDeck,
    getCardMeaning
} from '../src/commands/tarokka.js';

describe('Tarokka Deck', () => {
    describe('shuffleDeck', () => {
        it('should return a shuffled deck with all cards', () => {
            const deck = shuffleDeck();
            const originalLength = deck.length;
            const uniqueCards = new Set(deck.map(card => card.id));
            
            expect(deck.length).toBeGreaterThan(0);
            expect(uniqueCards.size).toBe(originalLength);
        });

        it('should produce different orders on multiple shuffles', () => {
            const deck1 = shuffleDeck();
            const deck2 = shuffleDeck();
            
            let differences = 0;
            for (let i = 0; i < deck1.length; i++) {
                if (deck1[i].id !== deck2[i].id) differences++;
            }
            
            // With a proper shuffle, most cards should be in different positions
            expect(differences).toBeGreaterThan(deck1.length * 0.5);
        });
    });

    describe('drawCard', () => {
        it('should draw a valid card from the deck', () => {
            const deck = shuffleDeck();
            const originalLength = deck.length;
            const card = drawCard(deck);
            
            expect(card).toHaveProperty('id');
            expect(card).toHaveProperty('name');
            expect(deck.length).toBe(originalLength - 1);
        });

        it('should throw error when deck is empty', () => {
            const emptyDeck = [];
            expect(() => drawCard(emptyDeck)).toThrow();
        });
    });

    describe('getCardMeaning', () => {
        it('should return valid meaning for high deck cards', () => {
            const meaning = getCardMeaning(1, 'high');
            expect(meaning).toHaveProperty('name');
            expect(meaning).toHaveProperty('meaning');
        });

        it('should return valid meaning for common deck cards', () => {
            const meaning = getCardMeaning(1, 'common');
            expect(meaning).toHaveProperty('name');
            expect(meaning).toHaveProperty('meaning');
        });

        it('should handle invalid card IDs', () => {
            expect(() => getCardMeaning(0, 'high')).toThrow();
            expect(() => getCardMeaning(1000, 'common')).toThrow();
        });

        it('should handle invalid deck types', () => {
            expect(() => getCardMeaning(1, 'invalid')).toThrow();
        });
    });
});
