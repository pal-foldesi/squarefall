import { SQUARE_SIDE_LENGTH } from '../constants.js'

import Grid from '../grid/grid.js'
import Score from '../score/score.js'
import Speed from '../speed/speed.js'

export class Game {
  constructor (canvas, context, shapeGenerator) {
    this.canvas = canvas
    this.context = context
    this.shapeGenerator = shapeGenerator
  }

  init () {
    this.setCanvasWidth()
    this.setCanvasHeight()

    window.setTimeout(() => {
      document.getElementById('loading').hidden = true
      document.getElementById('container').style.display = 'grid'
    }, 200) // to allow the user some time to spot the loading text

    this.grid = new Grid(this.canvas, this.context)
    const generatedShape = this.shapeGenerator.generateShape()
    this.grid.shapes.push(generatedShape)
    this.grid.movingShape = generatedShape
    generatedShape.draw()
    this.score = new Score()
    this.speed = new Speed()
    document.getElementById('current-speed').innerText = this.speed.value
    this.SCORE_PER_SPEED_INCREASE = 50
    this.MAX_SPEED = 9
    this.paused = (event) => {
      if (this.grid.movingShape) {
        switch (event.key) {
          case 'p': this.pause(); break
          default: break
        }
      }
    }
    this.keyPressed = (event) => {
      if (this.grid.movingShape) {
        switch (event.key) {
          case 'j': this.grid.moveShapeLeft(); break
          case 'k': this.grid.rotateShape(); break
          case 'l': this.grid.moveShapeRight(); break
          case ' ':
            // to avoid possible side effects with several intervals triggering simultaneously or closely after each other
            window.clearInterval(this.heartbeatInterval)
            this.heartbeatInterval = undefined
            this.grid.moveShapeToBottom()

            if (!this.grid.thereIsRoomToMoveDown()) {
              this.grid.movingShape = undefined
              const fullRowCount = this.grid.removeFullRows()
              if (fullRowCount > 0) {
                this.requestScoreIncrease(fullRowCount)
                this.requestSpeedIncrease()
              }
              const generatedShape = this.shapeGenerator.generateShape()
              if (this.grid.noOtherShapeIsInTheWay(generatedShape)) {
                this.grid.shapes.push(generatedShape)
                generatedShape.draw()
                this.grid.movingShape = generatedShape
              } else {
                this.end()
              }
            }

            if (this.grid.movingShape && this.heartbeatInterval === undefined) {
              this.heartbeatInterval = window.setInterval(() => self.heartbeat(), self.speed.delay)
            }
            break
          case '1': this.grid.drawAllPoints(); break
          case '2': this.grid.drawCoordinates(); break
          case '3': this.grid.movingShape.drawEdgePoints(); break
          case '4': this.grid.drawLines(); break
          default: break
        }
      }
    }
    this.keyHandler = this.keyPressed.bind(this)
    window.addEventListener('keypress', this.keyHandler)
    this.pauseKeyHandler = this.paused.bind(this)
    window.addEventListener('keypress', this.pauseKeyHandler)

    const self = this
    this.heartbeatInterval = window.setInterval(() => self.heartbeat(), self.speed.delay)

    this.isPaused = false
  }

  setCanvasWidth () {
    const desiredWidth = 10 * SQUARE_SIDE_LENGTH

    if (desiredWidth < window.screen.availWidth) {
      this.canvas.width = desiredWidth
    }
  }

  setCanvasHeight () {
    let desiredHeight = window.screen.availHeight

    if (desiredHeight % 100 !== 0) {
      desiredHeight -= desiredHeight % 100
    }

    desiredHeight -= 100 // To leave room for browser/OS UI toolbars

    if (desiredHeight > 20 * SQUARE_SIDE_LENGTH) {
      desiredHeight = 20 * SQUARE_SIDE_LENGTH
    }

    this.canvas.height = desiredHeight
  }

  heartbeat () {
    if (!this.grid.thereIsRoomToMoveDown()) {
      this.grid.movingShape = undefined
      const fullRowCount = this.grid.removeFullRows()
      if (fullRowCount > 0) {
        this.requestScoreIncrease(fullRowCount)
        this.requestSpeedIncrease()
      }
      const generatedShape = this.shapeGenerator.generateShape()
      if (this.grid.noOtherShapeIsInTheWay(generatedShape)) {
        this.grid.shapes.push(generatedShape)
        generatedShape.draw()
        this.grid.movingShape = generatedShape
      } else {
        this.end()
      }
    }

    if (this.grid.movingShape && this.grid.thereIsRoomToMoveDown()) {
      this.grid.moveShapeDown()
    }
  }

  end () {
    this.score.submit()
    Game.showGameOverText()
    window.clearInterval(this.heartbeatInterval)
    window.removeEventListener('keypress', this.keyHandler)
    window.removeEventListener('keypress', this.pauseKeyHandler)
  }

  requestSpeedIncrease () {
    if (this.speed.value < this.MAX_SPEED) {
      const currentSpeed = this.speed.value
      const desiredSpeed = Math.trunc(this.score.get() / this.SCORE_PER_SPEED_INCREASE)
      const newSpeed = this.speed.increaseIfNecessary(desiredSpeed)

      if (newSpeed > currentSpeed) {
        window.clearInterval(this.heartbeatInterval)
        const self = this
        this.heartbeatInterval = window.setInterval(() => self.heartbeat(), self.speed.delay)
        document.getElementById('current-speed').innerText = this.speed.value
      }
    }
  }

  requestScoreIncrease (rowsCleared) {
    this.score.increment(rowsCleared)
  }

  pause () {
    if (this.isPaused) {
      window.addEventListener('keypress', this.keyHandler)
      const self = this
      this.heartbeatInterval = window.setInterval(() => self.heartbeat(), this.speed.delay)
    } else {
      window.clearInterval(this.heartbeatInterval)
      window.removeEventListener('keypress', this.keyHandler)
    }
    this.isPaused = !this.isPaused
  }

  static showGameOverText () {
    document.getElementById('gameOverContainer').hidden = false
  }
}
