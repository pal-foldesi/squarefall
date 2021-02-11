import { Game } from './game.js'

describe('Game', () => {
  test('can be instantiated', () => {
    const canvas = document.createElement('canvas')
    expect(new Game(canvas)).toBeDefined()
  })

  test('can be initialized', () => {
    jest.spyOn(document, 'getElementById').mockReturnValue({})
    const canvas = document.createElement('canvas')
    const shapeGeneratorSubstitute = {
      generateShape: () => (
        {
          draw: () => { }
        }
      )
    }
    expect(() => {
      new Game(canvas, undefined, shapeGeneratorSubstitute).init()
    }).not.toThrow()
  })
})
