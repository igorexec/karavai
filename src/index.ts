import { createImage } from './image'
import { KaravaiOptions } from './types'

// tslint:disable-next-line:no-default-export
export default class Karavai {
  private loadedImages: string[] = []

  private canvas: HTMLCanvasElement

  private context: CanvasRenderingContext2D | null

  private options: KaravaiOptions

  private startPosition = 0

  constructor(
    private stream: string[],
    private canvasRef: HTMLCanvasElement,
    options: KaravaiOptions = { speed: 1 },
  ) {
    this.stream = stream
    this.canvas = canvasRef
    this.options = options
    this.context = canvasRef.getContext('2d')
  }

  preloadImages = () =>
    new Promise((resolve, reject) => {
      const { onImagesLoad } = this.options
      this.stream.forEach(imgPath => {
        createImage(imgPath, {
          onError: (err: Event | string) => reject(err),
          onLoad: () => {
            this.onImageLoad(imgPath)
            if (this.loadedImages.length === this.stream.length) {
              if (onImagesLoad) {
                onImagesLoad()
              }
              resolve()
            }
          },
        })
      })
    })

  start = () => {
    this.startPosition = window.pageYOffset
    this.subscribe()
  }

  stop = () => {
    this.unsubscribe()
  }

  private subscribe = () => {
    document.addEventListener('scroll', this.onScroll)
  }

  private unsubscribe = () => {
    document.removeEventListener('scroll', this.onScroll)
  }

  private onScroll = () => {
    const positionFromStart = window.pageYOffset - this.startPosition
    const speed = this.options.speed * 30
    const nextFrameIndex = Math.round(positionFromStart / speed)

    const isLastFrame = nextFrameIndex + 1 > this.stream.length
    if (isLastFrame || nextFrameIndex < 0) {
      return
    }

    this.drawImageOnCanvas(this.loadedImages[nextFrameIndex])
  }

  private onImageLoad = (imgPath: string) => {
    this.loadedImages.push(imgPath)
  }

  private drawImageOnCanvas = (imgPath: string) => {
    const image = new Image()
    image.src = imgPath
    image.onload = () => {
      if (this.context) {
        this.canvas.width = image.width
        this.canvas.height = image.height
        this.context.drawImage(image, 0, 0)
      }
    }
  }
}

(async function() {
  const images = Array.from({ length: 40 }, (_, idx) => `/img/${idx}.jpg`)
  const canvas: HTMLCanvasElement | null = document.querySelector('#canvas')

  if (canvas) {
    const karavai = new Karavai(images, canvas)
    await karavai.preloadImages()
    karavai.start()
  }
})()
