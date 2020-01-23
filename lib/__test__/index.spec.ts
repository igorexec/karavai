import Karavai from '../index'
// import {loadImage} from '../image'

jest.mock('../image')

describe('[Core] Karavai', () => {
  let instance: Karavai
  let images: string[]
  let canvas: HTMLCanvasElement
  let context: CanvasRenderingContext2D

  beforeEach(() => {
    images = []
    canvas = document.createElement('canvas')
    context = canvas.getContext('2d') as CanvasRenderingContext2D
    instance = new Karavai(images, canvas)
  })

  describe('preloadImages()', () => {
    test('return promise', () => {
      const actual = instance.preloadImages()
      expect(actual).toBeInstanceOf(Promise)
    })
  })

  describe('start()', () => {
    beforeEach(() => {
      jest.spyOn(document, 'addEventListener')
      instance.start()
    })

    test('add on scroll listener', () => {
      expect(document.addEventListener).toHaveBeenNthCalledWith(1, 'scroll', expect.any(Function))
    })
  })

  describe('stop()', () => {
    beforeEach(() => {
      jest.spyOn(document, 'addEventListener')
      instance.stop()
    })

    test('remove on scroll listener', () => {
      expect(document.addEventListener).toHaveBeenNthCalledWith(1, 'scroll', expect.any(Function))
    })
  })
})
