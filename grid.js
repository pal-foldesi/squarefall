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
    this.ROTATE_BY = Math.PI / 2;
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
    let twoCommonPointsHaveEqualYCoord;

    const points = this.movingShape.getSouthernmostPoints();

    for (const shape of this.shapes) {
      if (shape !== this.movingShape) {
        const otherPoints = shape.getNorthernmostPoints();

        const commonPoints = points.filter(point => otherPoints.some(otherPoint => otherPoint.equals(point)));
        const yCoords = commonPoints.map(elem => elem.y);
        const uniqueYCoords = new Set(yCoords);

        if (uniqueYCoords.size < yCoords.length) {
          /*console.log('Found common edges.');
          console.log('movingShape southernmost points:');
          console.log(points);
          console.log('otherShape northernmost points:');
          console.log(otherPoints);
          console.log('common points:');
          console.log(commonPoints);*/
          twoCommonPointsHaveEqualYCoord = true;
          break;
        }
      }
    }

    return !twoCommonPointsHaveEqualYCoord;
  }

  noOtherShapeIsInTheWayLeft() {
    let twoCommonPointsHaveEqualXCoord;

    const points = this.movingShape.getWesternmostPoints();

    for (const shape of this.shapes) {
      if (shape !== this.movingShape) {
        const otherPoints = shape.getEasternmostPoints();

        const commonPoints = points.filter(point => otherPoints.some(otherPoint => otherPoint.equals(point)));
        const xCoords = commonPoints.map(elem => elem.x);
        const uniqueXCoords = new Set(xCoords);

        if (uniqueXCoords.size < xCoords.length) {
          twoCommonPointsHaveEqualXCoord = true;
          break;
        }
      }
    }

    return !twoCommonPointsHaveEqualXCoord;
  }

  noOtherShapeIsInTheWayRight() {
    let twoCommonPointsHaveEqualXCoord;

    const points = this.movingShape.getEasternmostPoints();

    for (const shape of this.shapes) {
      if (shape !== this.movingShape) {
        const otherPoints = shape.getWesternmostPoints();

        const commonPoints = points.filter(point => otherPoints.some(otherPoint => otherPoint.equals(point)));
        const xCoords = commonPoints.map(elem => elem.x);
        const uniquexCoords = new Set(xCoords);

        if (uniquexCoords.size < xCoords.length) {
          twoCommonPointsHaveEqualXCoord = true;
          break;
        }
      }
    }

    return !twoCommonPointsHaveEqualXCoord;
  }

  rotateShape() {
    this.movingShape.clear();
    this.movingShape.rotate(this.ROTATE_BY);

    if (!(this.allPointsFitInsideGrid() && this.noOtherShapeIsInTheWay(this.movingShape))) {
      this.movingShape.rotate(-this.ROTATE_BY);
    }

    this.movingShape.draw();
  }

  allPointsFitInsideGrid() {
    return this.movingShape.squares.map(square => square.point.x)
      .every(x => x >= 0 && x <= CANVAS.width - SQUARE_SIDE_LENGTH)
      && this.movingShape.squares.map(square => square.point.y)
        .every(y => y >= 0 && y <= CANVAS.height - SQUARE_SIDE_LENGTH);
  }

  thereIsRoomToMoveDown() {
    const largestY = this.movingShape.getLargestYCoord();
    return (largestY + SQUARE_SIDE_LENGTH < CANVAS.height) && this.noOtherShapeIsInTheWayDown();
  }

  thereIsRoomToMoveLeft() {
    return this.movingShape.getLeftmostX() - SQUARE_SIDE_LENGTH >= 0 && this.noOtherShapeIsInTheWayLeft();
  }

  thereIsRoomToMoveRight() {
    return this.movingShape.getRightmostX() + SQUARE_SIDE_LENGTH < CANVAS.width && this.noOtherShapeIsInTheWayRight();
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
          const potentialOccupiedPoint = square.point;
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
              if (occupiedPoint.equals(square.point)) {
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
        if (square.point.y < yLimit) {
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

  redrawAllShapes() {
    /* TODO: investigate this further
    Due to a bug? with canvas and alpha levels, we re-draw all shapes */
    this.shapes.forEach((shape) => {
      shape.clear()
      shape.draw()
    })
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
}
