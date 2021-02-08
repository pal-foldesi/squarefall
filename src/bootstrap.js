import { Game } from './game/game.js';

const canvas = document.createElement('canvas');
canvas.setAttribute('id', 'gameCanvas');

const gameContainer = document.getElementById('gameContainer');
gameContainer.append(canvas);

const game = new Game(canvas);
game.init();