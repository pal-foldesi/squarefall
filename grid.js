import {
  CANVAS,
  CONTEXT,
  SQUARE_SIDE_LENGTH,
} from './constants.js';

import Point from './point.js';

export default class Grid {
  constructor() {
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
    const points = this.movingShape.squares.map(square => square.topLeftPoint);

    for (const shape of this.shapes) {
      if (shape !== this.movingShape) {
        const otherPoints = shape.squares.map(square => square.topLeftPoint);

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
    const points = this.movingShape.squares.map(square => square.topLeftPoint);

    for (const shape of this.shapes) {
      if (shape !== this.movingShape) {
        const otherPoints = shape.squares.map(square => square.topLeftPoint);

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
    const points = this.movingShape.squares.map(square => square.topLeftPoint);

    for (const shape of this.shapes) {
      if (shape !== this.movingShape) {
        const otherPoints = shape.squares.map(square => square.topLeftPoint);

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
    return this.movingShape.squares.map(square => square.topLeftPoint.x)
      .every(x => x >= 0 && x <= CANVAS.width - SQUARE_SIDE_LENGTH)
      && this.movingShape.squares.map(square => square.topLeftPoint.y)
        .every(y => y >= 0 && y <= CANVAS.height - SQUARE_SIDE_LENGTH);
  }

  thereIsRoomToMoveDown() {
    const largestY = this.movingShape.getLargestY();
    return (largestY + SQUARE_SIDE_LENGTH < CANVAS.height) && this.noOtherShapeIsInTheWayDown();
  }

  thereIsRoomToMoveLeft() {
    return this.movingShape.getSmallestX() - SQUARE_SIDE_LENGTH >= 0 && this.noOtherShapeIsInTheWayLeft();
  }

  thereIsRoomToMoveRight() {
    return this.movingShape.getLargestX() + SQUARE_SIDE_LENGTH < CANVAS.width && this.noOtherShapeIsInTheWayRight();
  }

  removeFullRows() {
    //  A full row is a row where all of the points are occupied by shapes.
    //  All points in a row have the same y-coordinate.
    //  , only detect full rows.
    //  Next, also remove them.
    const amountOfPointsInRow = CANVAS.width / SQUARE_SIDE_LENGTH;
    const rowCount = CANVAS.height / SQUARE_SIDE_LENGTH;
    let fullRowCount = 0;

    for (let i = 0; i < rowCount; i += 1) {
      //  Collect all potential points for that row
      const potentialOccupiedPoints = [];

      for (let j = 0; j < amountOfPointsInRow; j += 1) {
        potentialOccupiedPoints.push(new Point(j * SQUARE_SIDE_LENGTH, i * SQUARE_SIDE_LENGTH));
      }

      const occupiedPoints = [];
      // console.log(this);
      for (const shape of this.shapes) {
        for (const square of shape.squares) {
          const potentialOccupiedPoint = square.topLeftPoint;
          //  The point is part of a shape and occupies the same row
          //  as the potential points we are now examining
          if (potentialOccupiedPoint.y === i * SQUARE_SIDE_LENGTH) {
            occupiedPoints.push(potentialOccupiedPoint);
          }
        }
      }

      occupiedPoints.sort();

      //  console.log(potentialOccupiedPoints);
      //  console.log(occupiedPoints);

      if (Grid.allPointsMatch(potentialOccupiedPoints, occupiedPoints)) {
        fullRowCount += 1;
        console.log('Full row detected at row index: ' + i);
        //  Now we need to remove the row somehow...
        for (const shape of this.shapes) {
          for (const square of shape.squares) {
            // Check if part of occupiedPoints, if so, remove it
            for (const occupiedPoint of occupiedPoints) {
              if (occupiedPoint.equals(square.topLeftPoint)) {
                // console.log("found point in shape");
                square.clear();
                shape.remove(square);
              }
            }
          }
        }
        // Now we have truncated the shapes we wanted to, and need to shift
        // the grid downward somehow in accordance with the law of gravity
        this.shiftDownward(i);
      } else {
        // console.log('Non-full row detected.');
      }
    }
    return fullRowCount;
  }

  static allPointsMatch(pointArr1, pointArr2) {
    const arr1ValuesAsString = pointArr1.map(elem => [elem.x, elem.y])
      .reduce((acc, val) => acc.concat(val), []).sort().join();
    const arr2ValuesAsString = pointArr2.map(elem => [elem.x, elem.y])
      .reduce((acc, val) => acc.concat(val), []).sort().join();
    return arr1ValuesAsString === arr2ValuesAsString;
  }

  shiftDownward(rowIndex) {
    //  Everything that is above this rowIndex must shift down by SIDE_LENGTH.
    const yLimit = rowIndex * SQUARE_SIDE_LENGTH;
    for (const shape of this.shapes) {
      let redraw = false;
      for (const square of shape.squares) {
        if (square.topLeftPoint.y < yLimit) {
          square.clearAndMoveDown();
          redraw = true;
        }
      }
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

  /**
   * For help with debugging
   */
  static drawLines() {
    const rowCount = CANVAS.height / SQUARE_SIDE_LENGTH;

    for (let i = 0; i < rowCount; i += 1) {
      // clear previous
      CONTEXT.strokeStyle = 'rgba(255, 255, 255, 1.0)';
      CONTEXT.beginPath();
      CONTEXT.moveTo(0, i * SQUARE_SIDE_LENGTH);
      CONTEXT.lineTo(CANVAS.width, i * SQUARE_SIDE_LENGTH);
      CONTEXT.stroke();

      // draw new
      CONTEXT.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      CONTEXT.beginPath();
      CONTEXT.moveTo(0, i * SQUARE_SIDE_LENGTH);
      CONTEXT.lineTo(CANVAS.width, i * SQUARE_SIDE_LENGTH);
      CONTEXT.stroke();
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
