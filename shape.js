import {
  CANVAS,
  CONTEXT,
  SQUARE_SIDE_LENGTH,
} from './constants.js';

import Point from './point.js';
import Square from './square.js';

class Shape {
  constructor() {
    this.getPointOfTranslationX = CANVAS.width / 2;
  }

  init(pointOfTranslation, point1, point2, point3) {
    const pointOfTranslationSquare = new Square(pointOfTranslation, this.fillStyle);
    const square1 = new Square(point1, this.fillStyle);
    const square2 = new Square(point2, this.fillStyle);
    const square3 = new Square(point3, this.fillStyle);

    this.squares = [pointOfTranslationSquare, square1, square2, square3];
    this.pointOfTranslation = pointOfTranslation;
  }

  getPointOfTranslationX() {
    return this.getPointOfTranslationX;
  }

  remove(squareToRemove) {
    if (squareToRemove.hasOwnProperty('point')
      && squareToRemove.point.hasOwnProperty('x') && squareToRemove.point.hasOwnProperty('y')) {
      this.squares = this.squares.filter(square => !(square.equals(squareToRemove)));
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

  clear() {
    this.squares.forEach(square => square.clear());
  }

  rotate(by) {
    this.squares.forEach(square => square.point.transform(by, this.pointOfTranslation.x, this.pointOfTranslation.y));
  }

  hasPoint(otherPoint) {
    const points = this.squares.map(square => new Point(square.point.x, square.point.y));
    const thisPoint = points.filter(point => point.equals(otherPoint));
    return thisPoint !== undefined && thisPoint.length && thisPoint.length !== 0 && thisPoint.equals(otherPoint);
  }

  getSouthernmostPoints() {
    const flattenedPoints = this.squares
      .map(square => square.getSouthernmostPoints())
      .flat();
    const uniquePoints = Shape.removeDuplicatePoints(flattenedPoints);
    return uniquePoints;
  }

  getNorthernmostPoints() {
    const flattenedPoints = this.squares
      .map(square => square.getNorthernmostPoints())
      .flat();
    const uniquePoints = Shape.removeDuplicatePoints(flattenedPoints);
    return uniquePoints;
  }

  getWesternmostPoints() {
    const flattenedPoints = this.squares
      .map(square => square.getWesternmostPoints())
      .flat();
    const uniquePoints = Shape.removeDuplicatePoints(flattenedPoints);
    return uniquePoints;
  }

  getEasternmostPoints() {
    const flattenedPoints = this.squares
      .map(square => square.getEasternmostPoints())
      .flat();
    const uniquePoints = Shape.removeDuplicatePoints(flattenedPoints);
    return uniquePoints;
  }

  static removeDuplicatePoints(points) {
    return points.reduce((acc, val) => {
      if (!acc.some(elem => elem.x === val.x && elem.y === val.y)) {
        acc.push(val);
      }
      return acc;
    }, []);
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
    this.draw();
  }

  moveLeft() {
    this.clear();
    this.squares.forEach(square => square.moveLeft());
    this.draw();
  }

  moveRight() {
    this.clear();
    this.squares.forEach(square => square.moveRight());
    this.draw();
  }

  getLargestYCoord() {
    const mapped = this.squares.map(square => square.point.y);
    const sortedDescending = mapped.sort((a, b) => b - a);
    return sortedDescending[0];
  }

  getLeftmostX() {
    return this.squares.map(square => square.point.x).sort((a, b) => a - b).shift();
  }

  getRightmostX() {
    return this.squares.map(square => square.point.x).sort((a, b) => a - b).pop();
  }
}

class O extends Shape {
  constructor() {
    super();

    this.fillStyle = 'thistle';

    const point1 = new Point(super.getPointOfTranslationX()
      - SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);
    const point2 = new Point(super.getPointOfTranslationX(), SQUARE_SIDE_LENGTH);
    const point3 = new Point(super.getPointOfTranslationX()
      - SQUARE_SIDE_LENGTH, 2 * SQUARE_SIDE_LENGTH);
    const pointOfTranslation = new Point(super.getPointOfTranslationX(), 2 * SQUARE_SIDE_LENGTH);

    super.init(pointOfTranslation, point1, point2, point3);
  }

  // eslint-disable-next-line class-methods-use-this
  rotate() { }
}

class T extends Shape {
  constructor() {
    super();

    this.fillStyle = 'lightgrey';

    const point1 = new Point(super.getPointOfTranslationX()
      - SQUARE_SIDE_LENGTH, 2 * SQUARE_SIDE_LENGTH);
    const pointOfTranslation = new Point(super.getPointOfTranslationX(), 2 * SQUARE_SIDE_LENGTH);
    const point2 = new Point(super.getPointOfTranslationX()
      + SQUARE_SIDE_LENGTH, 2 * SQUARE_SIDE_LENGTH);
    const point3 = new Point(super.getPointOfTranslationX(), SQUARE_SIDE_LENGTH);

    super.init(pointOfTranslation, point1, point2, point3);
  }
}

export class I extends Shape {
  constructor() {
    super();

    this.fillStyle = 'yellowgreen';

    const pointOfTranslation = new Point(super.getPointOfTranslationX()
      + SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);
    const point1 = new Point(super.getPointOfTranslationX()
      - SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);
    const point2 = new Point(super.getPointOfTranslationX(), SQUARE_SIDE_LENGTH);
    const point3 = new Point(super.getPointOfTranslationX()
      + 2 * SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);

    super.init(pointOfTranslation, point1, point2, point3);
  }
}

class S extends Shape {
  constructor() {
    super();

    this.fillStyle = 'khaki';

    const point1 = new Point(super.getPointOfTranslationX(), SQUARE_SIDE_LENGTH);
    const point2 = new Point(super.getPointOfTranslationX()
      + SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);
    const point3 = new Point(super.getPointOfTranslationX()
      - SQUARE_SIDE_LENGTH, 2 * SQUARE_SIDE_LENGTH);
    const pointOfTranslation = new Point(super.getPointOfTranslationX(), 2 * SQUARE_SIDE_LENGTH);

    super.init(pointOfTranslation, point1, point2, point3);
  }
}

class Z extends Shape {
  constructor() {
    super();

    this.fillStyle = 'tan';

    const point1 = new Point(super.getPointOfTranslationX()
      - SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);
    const pointOfTranslation = new Point(super.getPointOfTranslationX(), SQUARE_SIDE_LENGTH);
    const point2 = new Point(super.getPointOfTranslationX(), 2 * SQUARE_SIDE_LENGTH);
    const point3 = new Point(super.getPointOfTranslationX()
      + SQUARE_SIDE_LENGTH, 2 * SQUARE_SIDE_LENGTH);

    super.init(pointOfTranslation, point1, point2, point3);
  }
}

class L extends Shape {
  constructor() {
    super();

    this.fillStyle = 'lightblue';

    const point1 = new Point(super.getPointOfTranslationX()
      - SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);
    const pointOfTranslation = new Point(super.getPointOfTranslationX(), SQUARE_SIDE_LENGTH);
    const point2 = new Point(super.getPointOfTranslationX()
      + SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);
    const point3 = new Point(super.getPointOfTranslationX()
      - SQUARE_SIDE_LENGTH, 2 * SQUARE_SIDE_LENGTH);

    super.init(pointOfTranslation, point1, point2, point3);
  }
}

class J extends Shape {
  constructor() {
    super();

    this.fillStyle = 'darksalmon';

    const point1 = new Point(super.getPointOfTranslationX()
      - SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);
    const pointOfTranslation = new Point(super.getPointOfTranslationX(), SQUARE_SIDE_LENGTH);
    const point2 = new Point(super.getPointOfTranslationX()
      + SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH);
    const point3 = new Point(super.getPointOfTranslationX()
      + SQUARE_SIDE_LENGTH, 2 * SQUARE_SIDE_LENGTH);

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
  T,
};

export default shapeTypes;
