import {drawImageOnCanvas} from '../canvas'

describe('[Service] Canvas', () => {
  let imageMock: HTMLImageElement
  let canvasMock: HTMLCanvasElement
  let contextMock: CanvasRenderingContext2D

  beforeEach(() => {
    imageMock = document.createElement('img')
    canvasMock = document.createElement('canvas')
  })

  describe('drawImageOnCanvas()', () => {
    beforeEach(() => {
      imageMock.width = 300
      imageMock.height = 200
      drawImageOnCanvas(imageMock, canvasMock, null)
    })

    test('set canvas width based on image width', () => {
      expect(canvasMock.width).toEqual(300)
    })

    test('set canvas height based on image height', () => {
      expect(canvasMock.height).toEqual(200)
    })

    describe('when has context', () => {
      beforeEach(() => {
        contextMock = canvasMock.getContext('2d') as CanvasRenderingContext2D
        jest.spyOn(contextMock, 'drawImage').mockImplementation()
        drawImageOnCanvas(imageMock, canvasMock, contextMock)
      })

      test('call drawImage on context with correct arguments', () => {
        expect(contextMock.drawImage).toHaveBeenCalledWith(imageMock, 0, 0)
      })
    })
  })
})
