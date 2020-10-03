import { CANVAS, CONTEXT, SQUARE_SIDE_LENGTH } from './constants.js';

import shapeTypes from './shape.js';

import Grid from './grid.js';
import Score from './score.js';
import Speed from './speed.js';

class Game {
  constructor() {
    this.isPaused = false;

    Game.setCanvasWidth();
    Game.setCanvasHeight();

    this.grid = new Grid();
    const generatedShape = Game.generateShape();
    this.grid.shapes.push(generatedShape);
    this.grid.movingShape = generatedShape;
    this.score = new Score();
    this.speed = new Speed();
    document.getElementById('current-speed').innerText = this.speed.value
    this.SCORE_PER_SPEED_INCREASE = 200;
    this.MAX_SPEED = 6;
    this.paused = ((event) => {
      if (this.grid.movingShape) {
        switch (event.key) {
          case 'p': this.pause(); break;
          default: break;
        }
      }
    });
    this.keyPressed = ((event) => {
      if (this.grid.movingShape) {
        switch (event.key) {
          case 'j': this.grid.moveShapeLeft(); break;
          case 'k': this.grid.rotateShape(); break;
          case 'l': this.grid.moveShapeRight(); break;
          case ' ': this.grid.moveShapeToBottom(); break;
          default: break;
        }
      }
    });
    this.keyHandler = this.keyPressed.bind(this);
    window.addEventListener('keypress', this.keyHandler);
    this.pauseKeyHandler = this.paused.bind(this);
    window.addEventListener('keypress', this.pauseKeyHandler);

    const self = this;
    this.heartbeatInterval = window.setInterval(() => self.heartbeat(), self.speed.delay);
  }

  static setCanvasWidth() {
    const desiredWidth = 10 * SQUARE_SIDE_LENGTH;

    if (desiredWidth < window.screen.availWidth) {
      CANVAS.width = desiredWidth;
    }
  }

  static setCanvasHeight() {
    let desiredHeight = window.screen.availHeight;

    if (desiredHeight % 100 !== 0) {
      desiredHeight -= desiredHeight % 100;
    }

    desiredHeight -= 100; // To leave room for browser/OS UI toolbars

    if (desiredHeight > 20 * SQUARE_SIDE_LENGTH) {
      desiredHeight = 20 * SQUARE_SIDE_LENGTH;
    }

    CANVAS.height = desiredHeight;
  }

  static generateShape() {
    const shapeTypesAsArray = Object.values(shapeTypes);
    const chosenShapeIndex = Math.round(Math.random() * (shapeTypesAsArray.length - 1));
    const ChosenShapeType = shapeTypesAsArray[chosenShapeIndex];
    const shape = new ChosenShapeType();
    return shape;
  }

  heartbeat() {
    // Grid.drawLines();
    if (!this.grid.thereIsRoomToMoveDown()) {
      this.grid.movingShape = undefined
      const fullRowCount = this.grid.removeFullRows()
      if (fullRowCount > 0) {
        this.requestScoreIncrease(fullRowCount)
        this.requestSpeedIncrease()
      }
      const generatedShape = Game.generateShape();
      if (this.grid.noOtherShapeIsInTheWay(generatedShape)) {
        this.grid.shapes.push(generatedShape);
        generatedShape.draw();
        this.grid.movingShape = generatedShape;
      } else {
        this.end()
      }
    }

    this.grid.redrawAllShapes()

    if (this.grid.movingShape && this.grid.thereIsRoomToMoveDown()) {
      this.grid.moveShapeDown()
    }
  }

  end() {
    this.score.submit()
    Game.showGameOverText()
    window.clearInterval(this.heartbeatInterval)
    window.removeEventListener('keypress', this.keyHandler)
    window.removeEventListener('keypress', this.pauseKeyHandler)
  }

  requestSpeedIncrease () {
    if (this.speed.value < this.MAX_SPEED) {
      const desiredSpeed = Math.trunc(this.score.get() / this.SCORE_PER_SPEED_INCREASE)
      const newSpeed = this.speed.increaseIfNecessary(desiredSpeed)

      if (newSpeed === desiredSpeed) {
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

  pause() {
    if (this.isPaused) {
      window.addEventListener('keypress', this.keyHandler);
      const self = this;
      this.heartbeatInterval = window.setInterval(() => self.heartbeat(), this.speed.delay);
    } else {
      window.clearInterval(this.heartbeatInterval);
      window.removeEventListener('keypress', this.keyHandler);
    }
    this.isPaused = !this.isPaused;
  }

  static showGameOverText() {
    document.getElementById('gameOverContainer').hidden = false;
  }
}

new Game(); // eslint-disable-line no-new
