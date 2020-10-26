import {
  CONTEXT,
  SQUARE_SIDE_LENGTH,
} from './constants.js';

import Point from './point.js';
import Square from './square.js';

class Shape {
  init(pointOfTranslation, point1, point2, point3) {
    const pointOfTranslationSquare = new Square(pointOfTranslation, this.fillStyle);
    const square1 = new Square(point1, this.fillStyle);
    const square2 = new Square(point2, this.fillStyle);
    const square3 = new Square(point3, this.fillStyle);

    this.squares = [pointOfTranslationSquare, square1, square2, square3];
    this.pointOfTranslation = pointOfTranslation;
    this.largestY = this.calculateLargestY();
    this.smallestX = this.calculateSmallestX();
    this.largestX = this.calculateLargestX();
  }

  getPointOfTranslationX() {
    return this.getPointOfTranslationX;
  }

  remove(squareToRemove) {
    if (squareToRemove.hasOwnProperty('point')
      && squareToRemove.point.hasOwnProperty('x') && squareToRemove.point.hasOwnProperty('y')) {
      this.squares = this.squares.filter(square => !(square.equals(squareToRemove)));
      this.largestY = this.calculateLargestY();
      this.smallestX = this.calculateSmallestX();
      this.largestX = this.calculateLargestX();
    }
  }

  draw() {
    this.squares.forEach(square => square.draw());
  }

  drawPoints() {
    this.squares.forEach(square => square.drawPoint());
  }

  drawCoordinates() {
    this.squares.forEach((square) => square.drawCoordinates());
  }

  markPointOfTranslation() {
    CONTEXT.fillStyle = 'rgba(120, 230, 244, 0.2)';

    CONTEXT.beginPath();
    CONTEXT.arc(this.pointOfTranslation.x, this.pointOfTranslation.y, 10, 0, 2 * Math.PI);
    CONTEXT.stroke();
  }

  drawEdgePoints() {
    this.squares.forEach(square => {
      square.drawEdgePoints();
    });
  }

  clear() {
    this.squares.forEach(square => square.clear());
  }

  rotateClockwise() {
    this.squares.forEach(square => {
      square.transformClockwise(this.pointOfTranslation.x, this.pointOfTranslation.y);
    });
    this.largestY = this.calculateLargestY();
    this.smallestX = this.calculateSmallestX();
    this.largestX = this.calculateLargestX();
  }

  rotateCounterClockwise() {
    this.squares.forEach(square => {
      square.transformCounterClockwise(this.pointOfTranslation.x, this.pointOfTranslation.y);
    });
    this.largestY = this.calculateLargestY();
    this.smallestX = this.calculateSmallestX();
    this.largestX = this.calculateLargestX();
  }

  hasPoint(otherPoint) {
    const points = this.squares.map(square => new Point(square.point.x, square.point.y));
    const thisPoint = points.filter(point => point.equals(otherPoint));
    return thisPoint !== undefined && thisPoint.length && thisPoint.length !== 0 && thisPoint.equals(otherPoint);
  }

  hasCommonPointWith(otherShape) {
    for (const square of this.squares) {
      for (const otherSquare of otherShape.squares) {
        if (square.equals(otherSquare)) {
          return true;
        }
      }
    }

    return false;
  }

  moveDown() {
    this.clear();
    this.squares.forEach(square => square.moveDown());
    this.largestY = this.calculateLargestY();
    this.draw();
  }

  moveLeft() {
    this.clear();
    this.squares.forEach(square => square.moveLeft());
    this.smallestX = this.calculateSmallestX();
    this.largestX = this.calculateLargestX();
    this.draw();
  }

  moveRight() {
    this.clear();
    this.squares.forEach(square => square.moveRight());
    this.smallestX = this.calculateSmallestX();
    this.largestX = this.calculateLargestX();
    this.draw();
  }

  calculateLargestY() {
    return this.squares
      .map(square => square.point.y)
      .sort()
      .pop();
  }

  calculateSmallestX() {
    return this.squares
      .map(square => square.point.x)
      .sort()
      .shift();
  }

  calculateLargestX() {
    return this.squares
      .map(square => square.point.x)
      .sort()
      .pop();
  }

  getLargestY() {
    return this.largestY;
  }

  getSmallestX() {
    return this.smallestX;
  }

  getLargestX() {
    return this.largestX;
  }

  clearAndMoveSquaresBelowYLimit(yLimit) {
    let redraw = false;
    this.squares.forEach(square => {
      if (square.isBelowLimit(yLimit)) {
        square.clearAndMoveDown();
        redraw = true;
      }
    })
    return redraw;
  }
}

class O extends Shape {
  constructor(xCoordOfAppearance) {
    super();

    this.fillStyle = 'thistle';

    const point1 = new Point(xCoordOfAppearance - SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);
    const point2 = new Point(xCoordOfAppearance, SQUARE_SIDE_LENGTH);
    const point3 = new Point(xCoordOfAppearance - SQUARE_SIDE_LENGTH, 2 * SQUARE_SIDE_LENGTH);
    const pointOfTranslation = new Point(xCoordOfAppearance, 2 * SQUARE_SIDE_LENGTH);

    super.init(pointOfTranslation, point1, point2, point3);
  }

  // eslint-disable-next-line class-methods-use-this
  rotateClockwise() { }

  // eslint-disable-next-line class-methods-use-this
  rotateCounterClockwise() { }
}

class T extends Shape {
  constructor(xCoordOfAppearance) {
    super();

    this.fillStyle = 'lightgrey';

    const point1 = new Point(xCoordOfAppearance - SQUARE_SIDE_LENGTH, 2 * SQUARE_SIDE_LENGTH);
    const pointOfTranslation = new Point(xCoordOfAppearance, 2 * SQUARE_SIDE_LENGTH);
    const point2 = new Point(xCoordOfAppearance + SQUARE_SIDE_LENGTH, 2 * SQUARE_SIDE_LENGTH);
    const point3 = new Point(xCoordOfAppearance, SQUARE_SIDE_LENGTH);

    super.init(pointOfTranslation, point1, point2, point3);
  }
}

class I extends Shape {
  constructor(xCoordOfAppearance) {
    super();

    this.fillStyle = 'yellowgreen';

    const pointOfTranslation = new Point(xCoordOfAppearance + SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);
    const point1 = new Point(xCoordOfAppearance - SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);
    const point2 = new Point(xCoordOfAppearance, SQUARE_SIDE_LENGTH);
    const point3 = new Point(xCoordOfAppearance + 2 * SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);

    super.init(pointOfTranslation, point1, point2, point3);
  }
}

class S extends Shape {
  constructor(xCoordOfAppearance) {
    super();

    this.fillStyle = 'khaki';

    const point1 = new Point(xCoordOfAppearance, SQUARE_SIDE_LENGTH);
    const point2 = new Point(xCoordOfAppearance + SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);
    const point3 = new Point(xCoordOfAppearance - SQUARE_SIDE_LENGTH, 2 * SQUARE_SIDE_LENGTH);
    const pointOfTranslation = new Point(xCoordOfAppearance, 2 * SQUARE_SIDE_LENGTH);

    super.init(pointOfTranslation, point1, point2, point3);
  }
}

class Z extends Shape {
  constructor(xCoordOfAppearance) {
    super();

    this.fillStyle = 'tan';

    const point1 = new Point(xCoordOfAppearance - SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);
    const pointOfTranslation = new Point(xCoordOfAppearance, SQUARE_SIDE_LENGTH);
    const point2 = new Point(xCoordOfAppearance, 2 * SQUARE_SIDE_LENGTH);
    const point3 = new Point(xCoordOfAppearance + SQUARE_SIDE_LENGTH, 2 * SQUARE_SIDE_LENGTH);

    super.init(pointOfTranslation, point1, point2, point3);
  }
}

class L extends Shape {
  constructor(xCoordOfAppearance) {
    super();

    this.fillStyle = 'lightblue';

    const point1 = new Point(xCoordOfAppearance - SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);
    const pointOfTranslation = new Point(xCoordOfAppearance, SQUARE_SIDE_LENGTH);
    const point2 = new Point(xCoordOfAppearance + SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);
    const point3 = new Point(xCoordOfAppearance - SQUARE_SIDE_LENGTH, 2 * SQUARE_SIDE_LENGTH);

    super.init(pointOfTranslation, point1, point2, point3);
  }
}

class J extends Shape {
  constructor(xCoordOfAppearance) {
    super();

    this.fillStyle = 'darksalmon';

    const point1 = new Point(xCoordOfAppearance - SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);
    const pointOfTranslation = new Point(xCoordOfAppearance, SQUARE_SIDE_LENGTH);
    const point2 = new Point(xCoordOfAppearance + SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);
    const point3 = new Point(xCoordOfAppearance + SQUARE_SIDE_LENGTH, 2 * SQUARE_SIDE_LENGTH);

    super.init(pointOfTranslation, point1, point2, point3);
  }
}

const shapeTypes = {
  I,
  O,
  L,
  J,
  S,
  Z,
  T
};

export default shapeTypes;
