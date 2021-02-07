"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SQUARE_SIDE_LENGTH = exports.CONTEXT = exports.CANVAS = void 0;
const CANVAS = document.getElementById('gameCanvas');
exports.CANVAS = CANVAS;
const CONTEXT = CANVAS.getContext('2d');
exports.CONTEXT = CONTEXT;
const SQUARE_SIDE_LENGTH = 50;
exports.SQUARE_SIDE_LENGTH = SQUARE_SIDE_LENGTH;