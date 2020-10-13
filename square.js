import {
  CONTEXT,
  SQUARE_SIDE_LENGTH,
} from './constants.js';

export default class Square {
  constructor(point, fillStyle) {
    this.topLeftPoint = point;
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

  drawEdgePoints() {
    CONTEXT.beginPath();
    CONTEXT.strokeStyle = 'yellow';
    CONTEXT.arc(this.topLeftPoint.x, this.topLeftPoint.y, 10, 0, 2 * Math.PI);
    CONTEXT.stroke();

    CONTEXT.beginPath();
    CONTEXT.strokeStyle = 'blue';
    CONTEXT.arc(this.topLeftPoint.x + SQUARE_SIDE_LENGTH, this.topLeftPoint.y, 10, 0, 2 * Math.PI);
    CONTEXT.stroke();

    CONTEXT.beginPath();
    CONTEXT.strokeStyle = 'magenta';
    CONTEXT.arc(this.topLeftPoint.x + SQUARE_SIDE_LENGTH, this.topLeftPoint.y + SQUARE_SIDE_LENGTH, 10, 0, 2 * Math.PI);
    CONTEXT.stroke();

    CONTEXT.beginPath();
    CONTEXT.strokeStyle = 'black';
    CONTEXT.arc(this.topLeftPoint.x, this.topLeftPoint.y + SQUARE_SIDE_LENGTH, 10, 0, 2 * Math.PI);
    CONTEXT.stroke();
  }

  clear() {
    CONTEXT.clearRect(this.topLeftPoint.x, this.topLeftPoint.y, this.sideLength, this.sideLength);
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
  }

  moveRight() {
    this.clear();
    this.moveAllPointsRight();
    this.draw();
  }

  moveAllPointsRight() {
    this.topLeftPoint.x += SQUARE_SIDE_LENGTH;
  }

  transformClockwise(x, y) {
    this.topLeftPoint.transformClockwise(x, y);
  }

  transformCounterClockwise(x, y) {
    this.topLeftPoint.transformCounterClockwise(x, y);
  }
}
