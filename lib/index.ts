import {loadImage} from './image'
import {KaravaiOptions} from './types'
import {drawImageOnCanvas} from './canvas'

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

  start = async (): Promise<void> => {
    this.startPosition = window.pageYOffset
    const image = await this.getImage(this.images[0])
    drawImageOnCanvas(image, this.canvasRef, this.context)

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

  private onScroll = async (): Promise<void> => {
    const {threshold} = this.options
    const positionFromStart = window.pageYOffset - this.startPosition
    const nextFrameIndex = Math.round(positionFromStart / threshold)

    const isLastFrame = nextFrameIndex + 1 > this.images.length
    if (isLastFrame || nextFrameIndex < 0) {
      return
    }

    const image = await this.getImage(this.images[nextFrameIndex])
    drawImageOnCanvas(image, this.canvasRef, this.context)
  }

  private getImage = async (imgPath: string): Promise<HTMLImageElement> => {
    let image = this.cachedImages.get(imgPath)
    if (!image) {
      image = await loadImage(imgPath)
      this.cachedImages.set(imgPath, image)
    }
    return image
  }
}
