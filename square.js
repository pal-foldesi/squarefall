"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./constants.js");

class Square {
  constructor(point, fillStyle) {
    // The point of a Square always refers to its top left point
    this.point = point;
    this.fillStyle = fillStyle;
    this.sideLength = _constants.SQUARE_SIDE_LENGTH;
  }

  draw() {
    _constants.CONTEXT.beginPath();

    _constants.CONTEXT.fillStyle = this.fillStyle;

    _constants.CONTEXT.fillRect(this.point.x, this.point.y, this.sideLength, this.sideLength);
  }

  drawPoint() {
    _constants.CONTEXT.beginPath();

    _constants.CONTEXT.strokeStyle = 'red';

    _constants.CONTEXT.arc(this.point.x, this.point.y, 10, 0, 2 * Math.PI);

    _constants.CONTEXT.stroke();
  }

  drawCoordinates() {
    _constants.CONTEXT.fillStyle = 'black';

    _constants.CONTEXT.fillText(`${this.point.x} | ${this.point.y}`, this.point.x, this.point.y);
  }

  drawEdgePoints() {
    Square.drawEdgePoint('yellow', this.point.x, this.point.y);
    Square.drawEdgePoint('blue', this.point.x + _constants.SQUARE_SIDE_LENGTH, this.point.y);
    Square.drawEdgePoint('magenta', this.point.x + _constants.SQUARE_SIDE_LENGTH, this.point.y + _constants.SQUARE_SIDE_LENGTH);
    Square.drawEdgePoint('black', this.point.x, this.point.y + _constants.SQUARE_SIDE_LENGTH);
  }

  static drawEdgePoint(color, x, y) {
    _constants.CONTEXT.beginPath();

    _constants.CONTEXT.strokeStyle = color;

    _constants.CONTEXT.arc(x, y, 10, 0, 2 * Math.PI);

    _constants.CONTEXT.stroke();
  }

  clear() {
    _constants.CONTEXT.clearRect(this.point.x, this.point.y, this.sideLength, this.sideLength);
  }

  equals(otherSquare) {
    return otherSquare !== undefined && otherSquare instanceof Square && this.sideLength === otherSquare.sideLength && this.point.equals(otherSquare.point);
  }

  moveDown() {
    this.clear();
    this.point.moveDown();
    this.draw();
  }

  clearAndMoveDown() {
    this.clear();
    this.point.moveDown();
  }

  moveLeft() {
    this.clear();
    this.point.moveLeft();
    this.draw();
  }

  moveRight() {
    this.clear();
    this.point.moveRight();
    this.draw();
  }

  transformClockwise(x, y) {
    this.point.transformClockwise(x, y);
  }

  transformCounterClockwise(x, y) {
    this.point.transformCounterClockwise(x, y);
  }

  isBelowLimit(yLimit) {
    return this.point.y < yLimit;
  }

}

exports.default = Square;