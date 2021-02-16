import { SQUARE_SIDE_LENGTH } from '../constants.js'
import { Game } from '../game/game.js'
import { ShapeGenerator } from '../shape-generator/shape-generator.js'
import shapeTypes from '../shape/shape.js'

describe('Squarefall', () => {
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

      const expectedXCoordinates = movingShape.squares
        .map(square => square.point)
        .map(point => point.x - SQUARE_SIDE_LENGTH)
        .sort()

      const moveLeftKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'j' })

      game.keyPressed(moveLeftKeyPressedEvent)

      const actualXCoordinates = movingShape.squares
        .map(square => square.point)
        .map(point => point.x)
        .sort()

      expect(actualXCoordinates).toEqual(expectedXCoordinates)
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

      const expectedXCoordinates = movingShape.squares
        .map(square => square.point)
        .map(point => point.x + SQUARE_SIDE_LENGTH)
        .sort()

      const moveRightKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'l' })

      game.keyPressed(moveRightKeyPressedEvent)

      const actualXCoordinates = movingShape.squares
        .map(square => square.point)
        .map(point => point.x)
        .sort()

      expect(actualXCoordinates).toEqual(expectedXCoordinates)
    })
  })

  describe('Move shape to bottom keypress works as expected', () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const shapeGenerator = new ShapeGenerator(canvas, context)

    const { I, O, L, J, S, Z, T } = shapeTypes

    const cases = [
      [I, [950, 950, 950, 950]],
      [O, [900, 900, 950, 950]],
      [L, [900, 900, 900, 950]],
      [J, [900, 900, 900, 950]],
      [S, [900, 900, 950, 950]],
      [Z, [900, 900, 950, 950]],
      [T, [900, 950, 950, 950]]
    ]

    test.each(cases)(' with shape of type %p', (type, expectedYCoordinates) => {
      jest.spyOn(Object, 'values').mockReturnValueOnce([type])

      jest.spyOn(document, 'getElementById').mockReturnValue({})

      jest.spyOn(window.screen, 'availWidth', 'get').mockReturnValueOnce(700)
      jest.spyOn(window.screen, 'availHeight', 'get').mockReturnValueOnce(1100)

      const game = new Game(canvas, context, shapeGenerator)

      game.init()

      const moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

      game.keyPressed(moveToBottomKeyPressedEvent)

      const actualYCoordinates = game.grid.shapes[0].squares
        .map(square => square.point)
        .map(point => point.y)
        .sort()

      expect(actualYCoordinates).toEqual(expectedYCoordinates)
    })
  })

  describe('Rotate shape works as expected', () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const shapeGenerator = new ShapeGenerator(canvas, context)

    const { I, O, L, J, S, Z, T } = shapeTypes

    const cases = [
      [I, [250, 250, 250, 250, 400, 450, 500, 550]],
      [O, [200, 200, 250, 250, 500, 500, 550, 550]],
      [L, [150, 200, 200, 200, 450, 450, 500, 550]],
      [J, [200, 250, 250, 250, 450, 500, 550, 550]],
      [S, [200, 200, 250, 250, 500, 550, 550, 600]],
      [Z, [250, 250, 300, 300, 500, 550, 550, 600]],
      [T, [250, 250, 250, 300, 500, 550, 550, 600]]
    ]

    test.each(cases)(' with shape of type %p', (type, expectedPointCoordinates) => {
      jest.spyOn(Object, 'values').mockReturnValueOnce([type])

      jest.spyOn(document, 'getElementById').mockReturnValue({})

      jest.spyOn(window.screen, 'availWidth', 'get').mockReturnValueOnce(700)
      jest.spyOn(window.screen, 'availHeight', 'get').mockReturnValueOnce(1100)

      const game = new Game(canvas, context, shapeGenerator)

      game.init()

      // there's not enough room initially to rotate certain shapes. to exercise them thoroughly, we first let them fall a bit
      for (let i = 0; i < 10; i++) {
        game.heartbeat()
      }

      const rotateKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'k' })

      game.keyPressed(rotateKeyPressedEvent)

      const actualPointCoordinates = game.grid.movingShape.squares
        .map(square => square.point)
        .map(point => [point.x, point.y])
        .flat()
        .sort()

      expect(actualPointCoordinates).toEqual(expectedPointCoordinates)
    })
  })

  describe('A full bottom row can be cleared', () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const shapeGenerator = new ShapeGenerator(canvas, context)

    const { I, J, T } = shapeTypes

    jest.spyOn(Object, 'values')
      .mockReturnValueOnce([I])
      .mockReturnValueOnce([J])
      .mockReturnValueOnce([T])

    jest.spyOn(document, 'getElementById').mockReturnValue({})

    jest.spyOn(window.screen, 'availWidth', 'get').mockReturnValueOnce(700)
    jest.spyOn(window.screen, 'availHeight', 'get').mockReturnValueOnce(1100)

    const game = new Game(canvas, context, shapeGenerator)

    game.init()

    for (let i = 0; i < 4; i++) {
      const moveLeftKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'j' })
      game.keyPressed(moveLeftKeyPressedEvent)
    }

    let moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.heartbeat()

    for (let i = 0; i < 2; i++) {
      const rotateKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'k' })
      game.keyPressed(rotateKeyPressedEvent)
    }

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.heartbeat()

    for (let i = 0; i < 3; i++) {
      const moveRightKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: 'l' })
      game.keyPressed(moveRightKeyPressedEvent)
    }

    moveToBottomKeyPressedEvent = new window.KeyboardEvent('keypressed', { key: ' ' })

    game.keyPressed(moveToBottomKeyPressedEvent)

    game.heartbeat()

    expect(game.score.get()).toBeGreaterThan(0)

    const expectedRemainingPointCoordinates = [200, 400, 950, 950]

    const actualRemainingPointCoordinates = game.grid.shapes
      .slice(0, game.grid.shapes.length - 1)
      .map(shape => shape.squares)
      .flat()
      .map(square => square.point)
      .map(point => [point.x, point.y])
      .flat()
      .sort()

    expect(actualRemainingPointCoordinates).toEqual(expectedRemainingPointCoordinates)
  })
})
