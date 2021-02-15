import Grid, { emptySquareCharacter, fullSquareCharacter } from './grid.js'
import Point from '../point/point.js'
import shapeTypes, { Shape } from '../shape/shape.js'
import { ShapeGenerator } from '../shape-generator/shape-generator.js'
import { SQUARE_SIDE_LENGTH } from '../constants.js'

describe('Grid', () => {
  test('can be instantiated', () => {
    expect(new Grid()).toBeDefined()
  })

  describe('hasOccupiedPoint()', () => {
    const pointOfTranslation = new Point(1, 2)
    const otherPoints = [new Point(1, 3)]

    const shape = new Shape()
    shape.init(undefined, pointOfTranslation, otherPoints)

    const grid = new Grid()
    grid.shapes.push(shape)

    const cases = [
      [grid, 1, 4, false],
      [grid, 2, 3, false],
      [grid, 1, 2, true],
      [grid, 1, 3, true]
    ]
    test.each(cases)('%o.hasOccupiedPoint(%i, %i)', (grid, x, y, expected) => {
      expect(grid.hasOccupiedPoint(x, y)).toBe(expected)
    })
  })

  test('print()', () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const shapeGenerator = new ShapeGenerator(canvas, context)

    const { I, J, Z } = shapeTypes

    jest.spyOn(Object, 'values')
      .mockReturnValueOnce([I])
      .mockReturnValueOnce([J])
      .mockReturnValueOnce([Z])

    const iShape = shapeGenerator.generateShape()
    const jShape = shapeGenerator.generateShape()
    const zShape = shapeGenerator.generateShape()

    iShape.squares.forEach(square => {
      square.point.y = square.point.y + 10 * SQUARE_SIDE_LENGTH
    })

    jShape.squares.forEach(square => {
      square.point.x = square.point.x + 4 * SQUARE_SIDE_LENGTH
    })

    zShape.squares.forEach(square => {
      square.point.x = square.point.x + 2 * SQUARE_SIDE_LENGTH
      square.point.y = square.point.y + 2 * SQUARE_SIDE_LENGTH
    })

    canvas.width = 500
    canvas.height = 1000

    const grid = new Grid(canvas, context)
    grid.shapes.push(iShape, jShape, zShape)

    const firstRow = emptySquareCharacter.repeat(6) + fullSquareCharacter.repeat(3) + emptySquareCharacter
    const secondRow = emptySquareCharacter.repeat(8) + fullSquareCharacter + emptySquareCharacter
    const thirdRow = emptySquareCharacter.repeat(4) + fullSquareCharacter.repeat(2) + emptySquareCharacter.repeat(4)
    const fourthRow = emptySquareCharacter.repeat(5) + fullSquareCharacter.repeat(2) + emptySquareCharacter.repeat(3)
    const eleventhRow = emptySquareCharacter + fullSquareCharacter.repeat(4) + emptySquareCharacter.repeat(5)
    const emptyRow = emptySquareCharacter.repeat(10)

    let expectedOutput = firstRow + '\n' + secondRow + '\n' + thirdRow + '\n' + fourthRow + '\n'
    for (let i = 0; i < 6; i++) {
      expectedOutput += emptyRow + '\n'
    }
    expectedOutput += eleventhRow + '\n'
    for (let i = 0; i < 8; i++) {
      expectedOutput += emptyRow + '\n'
    }
    expectedOutput += emptyRow

    const actualOutput = grid.print()
    expect(actualOutput).toBe(expectedOutput)
  })
})
