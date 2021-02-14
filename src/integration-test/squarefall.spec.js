import { SQUARE_SIDE_LENGTH } from '../constants.js'
import { Game } from '../game/game.js'
import { ShapeGenerator } from '../shape-generator/shape-generator.js'
import shapeTypes from '../shape/shape.js'

describe('Squarefall', () => {
  test('Canvas dimensions are setup as expected', () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const shapeGenerator = new ShapeGenerator(canvas, context)
    const game = new Game(canvas, context, shapeGenerator)
    expect(game).toBeDefined()

    jest.spyOn(document, 'getElementById').mockReturnValue({})

    jest.spyOn(window.screen, 'availWidth', 'get').mockReturnValueOnce(700)
    jest.spyOn(window.screen, 'availHeight', 'get').mockReturnValueOnce(1100)

    expect(() => {
      game.init()
    }).not.toThrow()

    const adjustedWidth = canvas.width
    const adjustedHeight = canvas.height

    expect(adjustedWidth).toBe(500)
    expect(adjustedHeight).toBe(1000)
  })

  describe('Move shape left keypress works as expected', () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const shapeGenerator = new ShapeGenerator(canvas, context)

    const { I, O, L, J, S, Z, T } = shapeTypes

    const cases = [
      [I], [O], [L], [J], [S], [Z], [T]
    ]

    test.each(cases)(' with shape of type %p', (type) => {
      jest.spyOn(Object, 'values').mockReturnValueOnce([type])

      jest.spyOn(document, 'getElementById').mockReturnValue({})

      jest.spyOn(window.screen, 'availWidth', 'get').mockReturnValueOnce(700)
      jest.spyOn(window.screen, 'availHeight', 'get').mockReturnValueOnce(1100)

      const game = new Game(canvas, context, shapeGenerator)

      game.init()

      const movingShape = game.grid.movingShape

      const expectedPointCoordinates = movingShape.squares
        .map(square => square.point)
        .map(point => [point.x - SQUARE_SIDE_LENGTH, point.y])
        .flat()
        .sort()

      const moveLeftKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'j' })

      game.keyPressed(moveLeftKeyPressedEvent)

      const actualPointCoordinates = movingShape.squares
        .map(square => square.point)
        .map(point => [point.x, point.y])
        .flat()
        .sort()

      expect(actualPointCoordinates).toEqual(expectedPointCoordinates)
    })
  })

  describe('Move shape right keypress works as expected', () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const shapeGenerator = new ShapeGenerator(canvas, context)

    const { I, O, L, J, S, Z, T } = shapeTypes

    const cases = [
      [I], [O], [L], [J], [S], [Z], [T]
    ]

    test.each(cases)(' with shape of type %p', (type) => {
      jest.spyOn(Object, 'values').mockReturnValueOnce([type])

      jest.spyOn(document, 'getElementById').mockReturnValue({})

      jest.spyOn(window.screen, 'availWidth', 'get').mockReturnValueOnce(700)
      jest.spyOn(window.screen, 'availHeight', 'get').mockReturnValueOnce(1100)

      const game = new Game(canvas, context, shapeGenerator)

      game.init()

      const movingShape = game.grid.movingShape

      const expectedPointCoordinates = movingShape.squares
        .map(square => square.point)
        .map(point => [point.x + SQUARE_SIDE_LENGTH, point.y])
        .flat()
        .sort()

      const moveRightKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'l' })

      game.keyPressed(moveRightKeyPressedEvent)

      const actualPointCoordinates = movingShape.squares
        .map(square => square.point)
        .map(point => [point.x, point.y])
        .flat()
        .sort()

      expect(actualPointCoordinates).toEqual(expectedPointCoordinates)
    })
  })
})
