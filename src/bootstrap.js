import { Game } from './game/game.js'
import { ShapeGenerator } from './shape-generator/shape-generator.js'

const canvas = document.createElement('canvas')
canvas.setAttribute('id', 'gameCanvas')

const gameContainer = document.getElementById('gameContainer')
gameContainer.append(canvas)

const context = canvas.getContext('2d')
const shapeGenerator = new ShapeGenerator(canvas, context)
const game = new Game(canvas, context, shapeGenerator)
game.init()
