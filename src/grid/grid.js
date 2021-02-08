import {
  SQUARE_SIDE_LENGTH,
} from '../constants.js';

export default class Grid {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.shapes = [];
    this.movingShape = undefined;
  }

  moveShapeDown() {
    if (this.thereIsRoomToMoveDown()) {
      this.movingShape.moveDown();
    }
  }

  moveShapeLeft() {
    if (this.thereIsRoomToMoveLeft()) {
      this.movingShape.moveLeft();
    }
  }

  moveShapeRight() {
    if (this.thereIsRoomToMoveRight()) {
      this.movingShape.moveRight();
    }
  }

  moveShapeToBottom() {
    while (this.thereIsRoomToMoveDown()) {
      this.moveShapeDown();
    }
  }

  noOtherShapeIsInTheWayDown() {
    const points = this.movingShape.squares.map(square => square.point);

    for (const shape of this.shapes) {
      if (shape !== this.movingShape) {
        const otherPoints = shape.squares.map(square => square.point);

        const commonPoints = points
          .filter(point => otherPoints
            .some(otherPoint =>
              otherPoint.x == point.x &&
              otherPoint.y == point.y + SQUARE_SIDE_LENGTH)
          );

        if (commonPoints.length > 0) {
          return false;
        }
      }
    }

    return true;
  }

  noOtherShapeIsInTheWayLeft() {
    const points = this.movingShape.squares.map(square => square.point);

    for (const shape of this.shapes) {
      if (shape !== this.movingShape) {
        const otherPoints = shape.squares.map(square => square.point);

        const commonPoints = points
          .filter(point => otherPoints
            .some(otherPoint =>
              otherPoint.x + SQUARE_SIDE_LENGTH == point.x &&
              otherPoint.y == point.y)
          );

        if (commonPoints.length > 0) {
          return false;
        }
      }
    }

    return true;
  }

  noOtherShapeIsInTheWayRight() {
    const points = this.movingShape.squares.map(square => square.point);

    for (const shape of this.shapes) {
      if (shape !== this.movingShape) {
        const otherPoints = shape.squares.map(square => square.point);

        const commonPoints = points
          .filter(point => otherPoints
            .some(otherPoint =>
              otherPoint.x == point.x + SQUARE_SIDE_LENGTH &&
              otherPoint.y == point.y)
          );

        if (commonPoints.length > 0) {
          return false;
        }
      }
    }

    return true;
  }

  rotateShape() {
    this.movingShape.clear();
    this.movingShape.rotateClockwise();

    if (!(this.allPointsFitInsideGrid() && this.noOtherShapeIsInTheWay(this.movingShape))) {
      this.movingShape.rotateCounterClockwise();
    }

    this.movingShape.draw();
  }

  allPointsFitInsideGrid() {
    return this.movingShape.squares.map(square => square.point.x)
      .every(x => x >= 0 && x <= this.canvas.width - SQUARE_SIDE_LENGTH)
      && this.movingShape.squares.map(square => square.point.y)
        .every(y => y >= 0 && y <= this.canvas.height - SQUARE_SIDE_LENGTH);
  }

  thereIsRoomToMoveDown() {
    const largestY = this.movingShape.getLargestY();
    return (largestY + SQUARE_SIDE_LENGTH < this.canvas.height) && this.noOtherShapeIsInTheWayDown();
  }

  thereIsRoomToMoveLeft() {
    return this.movingShape.getSmallestX() - SQUARE_SIDE_LENGTH >= 0 && this.noOtherShapeIsInTheWayLeft();
  }

  thereIsRoomToMoveRight() {
    return this.movingShape.getLargestX() + SQUARE_SIDE_LENGTH < this.canvas.width && this.noOtherShapeIsInTheWayRight();
  }

  removeFullRows() {
    const amountOfPointsInRow = this.canvas.width / SQUARE_SIDE_LENGTH;
    const rowCount = this.canvas.height / SQUARE_SIDE_LENGTH;
    let fullRowCount = 0;

    for (let i = 0; i < rowCount; i += 1) {
      const occupiedSquaresAndShapes = new Map();
      for (const shape of this.shapes) {
        for (const square of shape.squares) {
          if (square.point.y === i * SQUARE_SIDE_LENGTH) {
            occupiedSquaresAndShapes.set(square, shape);
          }
        }
      }

      if (occupiedSquaresAndShapes.size === amountOfPointsInRow) {
        fullRowCount += 1;
        for (const [square, shape] of occupiedSquaresAndShapes) {
          square.clear();
          shape.remove(square);
        }
        this.shiftDownward(i);
      }
    }
    return fullRowCount;
  }

  shiftDownward(rowIndex) {
    //  Everything that is above this rowIndex must shift down by SIDE_LENGTH.
    const yLimit = rowIndex * SQUARE_SIDE_LENGTH;
    for (const shape of this.shapes) {
      const redraw = shape.clearAndMoveSquaresBelowYLimit(yLimit);
      if (redraw) {
        shape.draw();
      }
    }
  }

  noOtherShapeIsInTheWay(shape) {
    for (const otherShape of this.shapes) {
      if (otherShape !== shape) {
        if (otherShape.hasCommonPointWith(shape)) {
          return false;
        }
      }
    }

    return true;
  }

  drawLines() {
    const rowCount = this.canvas.height / SQUARE_SIDE_LENGTH;
    for (let i = 1; i < rowCount; i += 1) {
      this.context.strokeStyle = 'black';
      this.context.beginPath();
      this.context.moveTo(0, i * SQUARE_SIDE_LENGTH);
      this.context.lineTo(this.canvas.width, i * SQUARE_SIDE_LENGTH);
      this.context.stroke();
    }
  }

  drawAllPoints() {
    for (const shape of this.shapes) {
      shape.drawPoints();
    }
  }

  drawCoordinates() {
    for (const shape of this.shapes) {
      shape.drawCoordinates();
    }
  }
}
