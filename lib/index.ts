import {loadImage} from './image'
import {KaravaiOptions} from './types'

// tslint:disable-next-line:no-default-export
export default class Karavai {
  private startPosition = 0
  private readonly context: CanvasRenderingContext2D | null
  private readonly cachedImages: Map<string, HTMLImageElement>

  constructor(
    private images: string[],
    private canvasRef: HTMLCanvasElement,
    private options: KaravaiOptions = {threshold: 30, preload: images.length},
  ) {
    this.context = canvasRef.getContext('2d')
    this.cachedImages = new Map<string, HTMLImageElement>()
  }

  preloadImages = (): Promise<void[]> => {
    const {preload} = this.options
    const decoupledImages = this.images.slice(0, preload)

    return Promise.all(
      decoupledImages.map(async imgPath => {
        const image = await loadImage(imgPath)
        this.cachedImages.set(imgPath, image)
      }),
    )
  }

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
    const {threshold} = this.options
    const positionFromStart = window.pageYOffset - this.startPosition
    const nextFrameIndex = Math.round(positionFromStart / threshold)

    const isLastFrame = nextFrameIndex + 1 > this.images.length
    if (isLastFrame || nextFrameIndex < 0) {
      return
    }

    this.drawImageOnCanvas(this.images[nextFrameIndex])
  }

  private drawImageOnCanvas = async (imgPath: string): Promise<void> => {
    let image = this.cachedImages.get(imgPath)
    if (!image) {
      image = await loadImage(imgPath)
      this.cachedImages.set(imgPath, image)
    }
    this.setCanvasImage(image)
  }

  private setCanvasImage = (image: HTMLImageElement): void => {
    const {width, height} = image

    this.canvasRef.width = width
    this.canvasRef.height = height
    if (this.context) {
      this.context.drawImage(image, 0, 0)
    }
  }
}
