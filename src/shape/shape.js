import { SQUARE_SIDE_LENGTH } from '../constants.js'

import Point from '../point/point.js'
import Square from '../square/square.js'

export class Shape {
  init (fillStyle, pointOfTranslation, points, context) {
    this.pointOfTranslation = pointOfTranslation

    const pointOfTranslationSquare = new Square(pointOfTranslation, fillStyle, context)
    const otherSquares = points.map(point => new Square(point, fillStyle, context))

    this.squares = [pointOfTranslationSquare, ...otherSquares]

    this.largestY = this.calculateLargestY()
    this.smallestX = this.calculateSmallestX()
    this.largestX = this.calculateLargestX()

    this.context = context
  }

  getPointOfTranslationX () {
    return this.getPointOfTranslationX
  }

  remove (squareToRemove) {
    if (Object.prototype.hasOwnProperty.call(squareToRemove, 'point') &&
      Object.prototype.hasOwnProperty.call(squareToRemove.point, 'x') &&
      Object.prototype.hasOwnProperty.call(squareToRemove.point, 'y')) {
      this.squares = this.squares.filter(square => !(square.equals(squareToRemove)))
      this.largestY = this.calculateLargestY()
      this.smallestX = this.calculateSmallestX()
      this.largestX = this.calculateLargestX()
    }
  }

  draw () {
    this.squares.forEach(square => square.draw())
  }

  drawPoints () {
    this.squares.forEach(square => square.drawPoint())
  }

  drawCoordinates () {
    this.squares.forEach((square) => square.drawCoordinates())
  }

  markPointOfTranslation () {
    this.context.fillStyle = 'rgba(120, 230, 244, 0.2)'

    this.context.beginPath()
    this.context.arc(this.pointOfTranslation.x, this.pointOfTranslation.y, 10, 0, 2 * Math.PI)
    this.context.stroke()
  }

  drawEdgePoints () {
    this.squares.forEach(square => {
      square.drawEdgePoints()
    })
  }

  clear () {
    this.squares.forEach(square => square.clear())
  }

  rotateClockwise () {
    this.squares.forEach(square => {
      square.transformClockwise(this.pointOfTranslation.x, this.pointOfTranslation.y)
    })
    this.largestY = this.calculateLargestY()
    this.smallestX = this.calculateSmallestX()
    this.largestX = this.calculateLargestX()
  }

  rotateCounterClockwise () {
    this.squares.forEach(square => {
      square.transformCounterClockwise(this.pointOfTranslation.x, this.pointOfTranslation.y)
    })
    this.largestY = this.calculateLargestY()
    this.smallestX = this.calculateSmallestX()
    this.largestX = this.calculateLargestX()
  }

  hasPoint (otherPoint) {
    const points = this.squares.map(square => new Point(square.point.x, square.point.y))
    const thisPoint = points.filter(point => point.equals(otherPoint))
    return thisPoint !== undefined && thisPoint.length && thisPoint.length !== 0 && thisPoint.equals(otherPoint)
  }

  hasCommonPointWith (otherShape) {
    for (const square of this.squares) {
      for (const otherSquare of otherShape.squares) {
        if (square.equals(otherSquare)) {
          return true
        }
      }
    }

    return false
  }

  moveDown () {
    this.clear()
    this.squares.forEach(square => square.moveDown())
    this.largestY = this.calculateLargestY()
    this.draw()
  }

  moveLeft () {
    this.clear()
    this.squares.forEach(square => square.moveLeft())
    this.smallestX = this.calculateSmallestX()
    this.largestX = this.calculateLargestX()
    this.draw()
  }

  moveRight () {
    this.clear()
    this.squares.forEach(square => square.moveRight())
    this.smallestX = this.calculateSmallestX()
    this.largestX = this.calculateLargestX()
    this.draw()
  }

  calculateLargestY () {
    return this.squares
      .map(square => square.point.y)
      .sort()
      .pop()
  }

  calculateSmallestX () {
    return this.squares
      .map(square => square.point.x)
      .sort()
      .shift()
  }

  calculateLargestX () {
    return this.squares
      .map(square => square.point.x)
      .sort()
      .pop()
  }

  getLargestY () {
    return this.largestY
  }

  getSmallestX () {
    return this.smallestX
  }

  getLargestX () {
    return this.largestX
  }

  clearAndMoveSquaresBelowYLimit (yLimit) {
    let redraw = false
    this.squares.forEach(square => {
      if (square.isBelowLimit(yLimit)) {
        square.clearAndMoveDown()
        redraw = true
      }
    })
    return redraw
  }

  hasOccupiedPoint (x, y) {
    const hasOccupiedPointPerSquare = this.squares.map(square => square.hasOccupiedPoint(x, y))
    return hasOccupiedPointPerSquare.includes(true)
  }
}

class O extends Shape {
  constructor (xCoordOfAppearance, context) {
    super()

    const point1 = new Point(xCoordOfAppearance - SQUARE_SIDE_LENGTH, 0)
    const point2 = new Point(xCoordOfAppearance, 0)
    const point3 = new Point(xCoordOfAppearance - SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH)
    const pointOfTranslation = new Point(xCoordOfAppearance, SQUARE_SIDE_LENGTH)

    const otherPoints = [point1, point2, point3]

    const fillStyle = 'thistle'

    super.init(fillStyle, pointOfTranslation, otherPoints, context)
  }

  // eslint-disable-next-line class-methods-use-this
  rotateClockwise () { }

  // eslint-disable-next-line class-methods-use-this
  rotateCounterClockwise () { }
}

class T extends Shape {
  constructor (xCoordOfAppearance, context) {
    super()

    const point1 = new Point(xCoordOfAppearance - SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH)
    const pointOfTranslation = new Point(xCoordOfAppearance, SQUARE_SIDE_LENGTH)
    const point2 = new Point(xCoordOfAppearance + SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH)
    const point3 = new Point(xCoordOfAppearance, 0)

    const otherPoints = [point1, point2, point3]

    const fillStyle = 'lightgrey'

    super.init(fillStyle, pointOfTranslation, otherPoints, context)
  }
}

class I extends Shape {
  constructor (xCoordOfAppearance, context) {
    super()

    const pointOfTranslation = new Point(xCoordOfAppearance, 0)
    const point1 = new Point(xCoordOfAppearance - 2 * SQUARE_SIDE_LENGTH, 0)
    const point2 = new Point(xCoordOfAppearance - SQUARE_SIDE_LENGTH, 0)
    const point3 = new Point(xCoordOfAppearance + SQUARE_SIDE_LENGTH, 0)

    const otherPoints = [point1, point2, point3]

    const fillStyle = 'yellowgreen'

    super.init(fillStyle, pointOfTranslation, otherPoints, context)
  }
}

class S extends Shape {
  constructor (xCoordOfAppearance, context) {
    super()

    const point1 = new Point(xCoordOfAppearance - SQUARE_SIDE_LENGTH, 0)
    const point2 = new Point(xCoordOfAppearance, 0)
    const point3 = new Point(xCoordOfAppearance - 2 * SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH)
    const pointOfTranslation = new Point(xCoordOfAppearance - SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH)

    const otherPoints = [point1, point2, point3]

    const fillStyle = 'khaki'

    super.init(fillStyle, pointOfTranslation, otherPoints, context)
  }
}

class Z extends Shape {
  constructor (xCoordOfAppearance, context) {
    super()

    const point1 = new Point(xCoordOfAppearance - SQUARE_SIDE_LENGTH, 0)
    const point2 = new Point(xCoordOfAppearance, 0)
    const pointOfTranslation = new Point(xCoordOfAppearance, SQUARE_SIDE_LENGTH)
    const point3 = new Point(xCoordOfAppearance + SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH)

    const otherPoints = [point1, point2, point3]

    const fillStyle = 'tan'

    super.init(fillStyle, pointOfTranslation, otherPoints, context)
  }
}

class L extends Shape {
  constructor (xCoordOfAppearance, context) {
    super()

    const point1 = new Point(xCoordOfAppearance - 2 * SQUARE_SIDE_LENGTH, 0)
    const pointOfTranslation = new Point(xCoordOfAppearance - SQUARE_SIDE_LENGTH, 0)
    const point2 = new Point(xCoordOfAppearance, 0)
    const point3 = new Point(xCoordOfAppearance - 2 * SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH)

    const otherPoints = [point1, point2, point3]

    const fillStyle = 'lightblue'

    super.init(fillStyle, pointOfTranslation, otherPoints, context)
  }
}

class J extends Shape {
  constructor (xCoordOfAppearance, context) {
    super()

    const point1 = new Point(xCoordOfAppearance - SQUARE_SIDE_LENGTH, 0)
    const pointOfTranslation = new Point(xCoordOfAppearance, 0)
    const point2 = new Point(xCoordOfAppearance + SQUARE_SIDE_LENGTH, 0)
    const point3 = new Point(xCoordOfAppearance + SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH)

    const otherPoints = [point1, point2, point3]

    const fillStyle = 'darksalmon'

    super.init(fillStyle, pointOfTranslation, otherPoints, context)
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
}

export default shapeTypes
