import {createImage, preloadImage} from './image'
import {KaravaiOptions} from './types'

// tslint:disable-next-line:no-default-export
export default class Karavai {
  private startPosition = 0
  private readonly context: CanvasRenderingContext2D | null
  private cachedImages: Map<string, HTMLImageElement>

  constructor(
    private images: string[],
    private canvasRef: HTMLCanvasElement,
    private options: KaravaiOptions = {threshold: 30},
  ) {
    this.context = canvasRef.getContext('2d')
    this.cachedImages = new Map<string, HTMLImageElement>()
  }

  preloadImages = (): Promise<void[]> =>
    Promise.all(
      this.images.map(imagePath =>
        preloadImage(imagePath).then(img => {
          this.cachedImages.set(imagePath, img)
        }),
      ),
    )

  start = (): void => {
    this.startPosition = window.pageYOffset
    this.drawImageOnCanvas(this.images[0])
    this.subscribe()
  }

  stop = (): void => {
    this.unsubscribe()
  }

  private subscribe = (): void => {
    document.addEventListener('scroll', this.onScroll)
  }

  private unsubscribe = (): void => {
    document.removeEventListener('scroll', this.onScroll)
  }

  private onScroll = (): void => {
    const positionFromStart = window.pageYOffset - this.startPosition
    const nextFrameIndex = Math.round(positionFromStart / this.options.threshold)

    const isLastFrame = nextFrameIndex + 1 > this.images.length
    if (isLastFrame || nextFrameIndex < 0) {
      return
    }

    this.drawImageOnCanvas(this.images[nextFrameIndex])
  }

  private drawImageOnCanvas = (imgPath: string): void => {
    const image = this.cachedImages.get(imgPath)
    if (image) {
      this.setCanvasImage(image)
      return
    }
    preloadImage(imgPath).then(img => {
      this.cachedImages.set(imgPath, img)
      this.setCanvasImage(img)
    })
  }

  private setCanvasImage = (image: HTMLImageElement): void => {
    this.canvasRef.width = image.width
    this.canvasRef.height = image.height
    if (this.context) {
      this.context.drawImage(image, 0, 0)
    }
  }
}
