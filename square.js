import {
  CONTEXT,
  SQUARE_SIDE_LENGTH,
} from './constants.js';

import Point from './point.js';

export default class Square {
  constructor(point, fillStyle) {
    this.topLeftPoint = point;
    this.topRightPoint = new Point(this.topLeftPoint.x + SQUARE_SIDE_LENGTH, this.topLeftPoint.y);
    this.bottomRightPoint = new Point(this.topLeftPoint.x + SQUARE_SIDE_LENGTH, this.topLeftPoint.y + SQUARE_SIDE_LENGTH);
    this.bottomLeftPoint = new Point(this.topLeftPoint.x, this.topLeftPoint.y + SQUARE_SIDE_LENGTH);
    this.fillStyle = fillStyle;
    this.sideLength = SQUARE_SIDE_LENGTH;
  }

  draw() {
    CONTEXT.beginPath();
    CONTEXT.fillStyle = this.fillStyle;
    CONTEXT.fillRect(this.topLeftPoint.x, this.topLeftPoint.y, this.sideLength, this.sideLength);
  }

  drawPoint() {
    CONTEXT.beginPath();
    CONTEXT.strokeStyle = 'red';
    CONTEXT.arc(this.topLeftPoint.x, this.topLeftPoint.y, 10, 0, 2 * Math.PI);
    CONTEXT.stroke();
  }

  drawCoordinates() {
    CONTEXT.fillStyle = 'black'
    CONTEXT.fillText(this.topLeftPoint.x + ' | ' + this.topLeftPoint.y, this.topLeftPoint.x, this.topLeftPoint.y);
  }

  clear() {
    CONTEXT.clearRect(this.topLeftPoint.x, this.topLeftPoint.y, this.sideLength, this.sideLength);
  }

  getSouthernmostPoints() {
    return [this.bottomLeftPoint, this.bottomRightPoint];
  }

  getNorthernmostPoints() {
    return [this.topLeftPoint, this.topRightPoint];
  }

  getWesternmostPoints() {
    return [this.topLeftPoint, this.bottomLeftPoint];
  }

  getEasternmostPoints() {
    return [this.topRightPoint, this.bottomRightPoint];
  }

  equals(otherSquare) {
    return this.sideLength === otherSquare.sideLength && this.topLeftPoint.equals(otherSquare.topLeftPoint);
  }

  moveDown() {
    this.clear();
    this.moveAllPointsDown();
    this.draw();
  }

  moveAllPointsDown() {
    this.topLeftPoint.y += SQUARE_SIDE_LENGTH;
    this.topRightPoint.y += SQUARE_SIDE_LENGTH;
    this.bottomRightPoint.y += SQUARE_SIDE_LENGTH;
    this.bottomLeftPoint.y += SQUARE_SIDE_LENGTH;
  }

  clearAndMoveDown() {
    this.clear();
    this.moveAllPointsDown();
  }

  moveLeft() {
    this.clear();
    this.moveAllPointsLeft();
    this.draw();
  }

  moveAllPointsLeft() {
    this.topLeftPoint.x += -SQUARE_SIDE_LENGTH;
    this.topRightPoint.x += -SQUARE_SIDE_LENGTH;
    this.bottomRightPoint.x += -SQUARE_SIDE_LENGTH;
    this.bottomLeftPoint.x += -SQUARE_SIDE_LENGTH;
  }

  moveRight() {
    this.clear();
    this.moveAllPointsRight();
    this.draw();
  }

  moveAllPointsRight() {
    this.topLeftPoint.x += SQUARE_SIDE_LENGTH;
    this.topRightPoint.x += SQUARE_SIDE_LENGTH;
    this.bottomRightPoint.x += SQUARE_SIDE_LENGTH;
    this.bottomLeftPoint.x += SQUARE_SIDE_LENGTH;
  }

  transformClockwise(x, y) {
    this.topLeftPoint.transformClockwise(x, y);
    this.topRightPoint.transformClockwise(x + SQUARE_SIDE_LENGTH, y);
    this.bottomRightPoint.transformClockwise(x + SQUARE_SIDE_LENGTH, y + SQUARE_SIDE_LENGTH);
    this.bottomLeftPoint.transformClockwise(x, y + SQUARE_SIDE_LENGTH);
  }

  transformCounterClockwise(x, y) {
    this.topLeftPoint.transformCounterClockwise(x, y);
    this.topRightPoint.transformCounterClockwise(x + SQUARE_SIDE_LENGTH, y);
    this.bottomRightPoint.transformCounterClockwise(x + SQUARE_SIDE_LENGTH, y + SQUARE_SIDE_LENGTH);
    this.bottomLeftPoint.transformCounterClockwise(x, y + SQUARE_SIDE_LENGTH);
  }
}
