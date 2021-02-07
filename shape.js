"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./constants.js");

var _point = _interopRequireDefault(require("./point.js"));

var _square = _interopRequireDefault(require("./square.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Shape {
  init(fillStyle, pointOfTranslation, points) {
    this.pointOfTranslation = pointOfTranslation;
    const pointOfTranslationSquare = new _square.default(pointOfTranslation, fillStyle);
    const otherSquares = points.map(point => new _square.default(point, fillStyle));
    this.squares = [pointOfTranslationSquare, ...otherSquares];
    this.largestY = this.calculateLargestY();
    this.smallestX = this.calculateSmallestX();
    this.largestX = this.calculateLargestX();
  }

  getPointOfTranslationX() {
    return this.getPointOfTranslationX;
  }

  remove(squareToRemove) {
    if (squareToRemove.hasOwnProperty('point') && squareToRemove.point.hasOwnProperty('x') && squareToRemove.point.hasOwnProperty('y')) {
      this.squares = this.squares.filter(square => !square.equals(squareToRemove));
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
    this.squares.forEach(square => square.drawCoordinates());
  }

  markPointOfTranslation() {
    _constants.CONTEXT.fillStyle = 'rgba(120, 230, 244, 0.2)';

    _constants.CONTEXT.beginPath();

    _constants.CONTEXT.arc(this.pointOfTranslation.x, this.pointOfTranslation.y, 10, 0, 2 * Math.PI);

    _constants.CONTEXT.stroke();
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
    const points = this.squares.map(square => new _point.default(square.point.x, square.point.y));
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
    return this.squares.map(square => square.point.y).sort().pop();
  }

  calculateSmallestX() {
    return this.squares.map(square => square.point.x).sort().shift();
  }

  calculateLargestX() {
    return this.squares.map(square => square.point.x).sort().pop();
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
    });
    return redraw;
  }

}

class O extends Shape {
  constructor(xCoordOfAppearance) {
    super();
    const point1 = new _point.default(xCoordOfAppearance - _constants.SQUARE_SIDE_LENGTH, 0);
    const point2 = new _point.default(xCoordOfAppearance, 0);
    const point3 = new _point.default(xCoordOfAppearance - _constants.SQUARE_SIDE_LENGTH, _constants.SQUARE_SIDE_LENGTH);
    const pointOfTranslation = new _point.default(xCoordOfAppearance, _constants.SQUARE_SIDE_LENGTH);
    const otherPoints = [point1, point2, point3];
    const fillStyle = 'thistle';
    super.init(fillStyle, pointOfTranslation, otherPoints);
  } // eslint-disable-next-line class-methods-use-this


  rotateClockwise() {} // eslint-disable-next-line class-methods-use-this


  rotateCounterClockwise() {}

}

class T extends Shape {
  constructor(xCoordOfAppearance) {
    super();
    const point1 = new _point.default(xCoordOfAppearance - _constants.SQUARE_SIDE_LENGTH, _constants.SQUARE_SIDE_LENGTH);
    const pointOfTranslation = new _point.default(xCoordOfAppearance, _constants.SQUARE_SIDE_LENGTH);
    const point2 = new _point.default(xCoordOfAppearance + _constants.SQUARE_SIDE_LENGTH, _constants.SQUARE_SIDE_LENGTH);
    const point3 = new _point.default(xCoordOfAppearance, 0);
    const otherPoints = [point1, point2, point3];
    const fillStyle = 'lightgrey';
    super.init(fillStyle, pointOfTranslation, otherPoints);
  }

}

class I extends Shape {
  constructor(xCoordOfAppearance) {
    super();
    const pointOfTranslation = new _point.default(xCoordOfAppearance, 0);
    const point1 = new _point.default(xCoordOfAppearance - 2 * _constants.SQUARE_SIDE_LENGTH, 0);
    const point2 = new _point.default(xCoordOfAppearance - _constants.SQUARE_SIDE_LENGTH, 0);
    const point3 = new _point.default(xCoordOfAppearance + _constants.SQUARE_SIDE_LENGTH, 0);
    const otherPoints = [point1, point2, point3];
    const fillStyle = 'yellowgreen';
    super.init(fillStyle, pointOfTranslation, otherPoints);
  }

}

class S extends Shape {
  constructor(xCoordOfAppearance) {
    super();
    const point1 = new _point.default(xCoordOfAppearance - _constants.SQUARE_SIDE_LENGTH, 0);
    const point2 = new _point.default(xCoordOfAppearance, 0);
    const point3 = new _point.default(xCoordOfAppearance - 2 * _constants.SQUARE_SIDE_LENGTH, _constants.SQUARE_SIDE_LENGTH);
    const pointOfTranslation = new _point.default(xCoordOfAppearance - _constants.SQUARE_SIDE_LENGTH, _constants.SQUARE_SIDE_LENGTH);
    const otherPoints = [point1, point2, point3];
    const fillStyle = 'khaki';
    super.init(fillStyle, pointOfTranslation, otherPoints);
  }

}

class Z extends Shape {
  constructor(xCoordOfAppearance) {
    super();
    const point1 = new _point.default(xCoordOfAppearance - _constants.SQUARE_SIDE_LENGTH, 0);
    const point2 = new _point.default(xCoordOfAppearance, 0);
    const pointOfTranslation = new _point.default(xCoordOfAppearance, _constants.SQUARE_SIDE_LENGTH);
    const point3 = new _point.default(xCoordOfAppearance + _constants.SQUARE_SIDE_LENGTH, _constants.SQUARE_SIDE_LENGTH);
    const otherPoints = [point1, point2, point3];
    const fillStyle = 'tan';
    super.init(fillStyle, pointOfTranslation, otherPoints);
  }

}

class L extends Shape {
  constructor(xCoordOfAppearance) {
    super();
    const point1 = new _point.default(xCoordOfAppearance - 2 * _constants.SQUARE_SIDE_LENGTH, 0);
    const pointOfTranslation = new _point.default(xCoordOfAppearance - _constants.SQUARE_SIDE_LENGTH, 0);
    const point2 = new _point.default(xCoordOfAppearance, 0);
    const point3 = new _point.default(xCoordOfAppearance - 2 * _constants.SQUARE_SIDE_LENGTH, _constants.SQUARE_SIDE_LENGTH);
    const otherPoints = [point1, point2, point3];
    const fillStyle = 'lightblue';
    super.init(fillStyle, pointOfTranslation, otherPoints);
  }

}

class J extends Shape {
  constructor(xCoordOfAppearance) {
    super();
    const point1 = new _point.default(xCoordOfAppearance - _constants.SQUARE_SIDE_LENGTH, 0);
    const pointOfTranslation = new _point.default(xCoordOfAppearance, 0);
    const point2 = new _point.default(xCoordOfAppearance + _constants.SQUARE_SIDE_LENGTH, 0);
    const point3 = new _point.default(xCoordOfAppearance + _constants.SQUARE_SIDE_LENGTH, _constants.SQUARE_SIDE_LENGTH);
    const otherPoints = [point1, point2, point3];
    const fillStyle = 'darksalmon';
    super.init(fillStyle, pointOfTranslation, otherPoints);
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
var _default = shapeTypes;
exports.default = _default;