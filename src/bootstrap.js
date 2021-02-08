import { Game } from './game.js';

const canvas = document.createElement('canvas');
canvas.setAttribute('id', 'gameCanvas');

const gameContainer = document.getElementById('gameContainer');
gameContainer.append(canvas);

new Game(canvas);