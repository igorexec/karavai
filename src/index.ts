import { createImage, preloadImage } from './image'
import { KaravaiOptions } from './types'

// tslint:disable-next-line:no-default-export
export default class Karavai {
  private startPosition = 0
  private readonly context: CanvasRenderingContext2D | null
  private cachedImages: Map<string, HTMLImageElement>

  constructor(
    private images: string[],
    private canvasRef: HTMLCanvasElement,
    private options: KaravaiOptions = { speed: 1 },
  ) {
    this.context = canvasRef.getContext('2d')
    canvasRef.style.width = '100%'
    this.cachedImages = new Map<string, HTMLImageElement>()
  }

  preloadImages = () =>
    Promise.all(
      this.images.map(imagePath =>
        preloadImage(imagePath).then(img => this.cachedImages.push(img)),
      ),
    )

  start = () => {
    this.startPosition = window.pageYOffset
    this.drawImageOnCanvas(this.images[0])
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

    const isLastFrame = nextFrameIndex + 1 > this.images.length
    if (isLastFrame || nextFrameIndex < 0) {
      return
    }

    this.drawImageOnCanvas(this.images[nextFrameIndex])
  }

  private drawImageOnCanvas = (imgPath: string) => {
    const image = createImage(imgPath)
    image.onload = () => {
      if (!this.context) {
        return
      }
      this.canvasRef.width = image.width
      this.canvasRef.height = image.height
      this.context.drawImage(image, 0, 0)
    }
  }
}

(async () => {
  const images = Array.from({ length: 40 }, (_, idx) => `/img/${idx}.jpg`)
  const canvas: HTMLCanvasElement | null = document.querySelector('#canvas')

  if (canvas) {
    const karavai = new Karavai(images, canvas)
    await karavai.preloadImages()
    karavai.start()
  }
})()
