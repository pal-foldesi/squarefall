import { Game } from './game.js';

describe('Game', () => {
    test('can be instantiated', () => {
        jest.spyOn(document, 'getElementById').mockReturnValue({});

        const canvas = document.createElement('canvas');
        expect(new Game(canvas)).toBeDefined();
    });
})
