import {loadImage} from './image'
import {KaravaiOptions} from './types'
import {drawImageOnCanvas} from './canvas'

// tslint:disable-next-line:no-default-export
export default class Karavai {
  private startPosition = 0
  private currentFrameIndex: number
  private readonly context: CanvasRenderingContext2D | null
  private readonly cachedImages: Map<string, HTMLImageElement>

  constructor(
    private images: string[],
    private canvasRef: HTMLCanvasElement,
    private options: KaravaiOptions = {threshold: 30},
  ) {
    this.context = canvasRef.getContext('2d')
    this.cachedImages = new Map<string, HTMLImageElement>()
    this.currentFrameIndex = 0
  }

  /**
   * Preloads images for karavai.
   *
   * @param {number} amount - The amount of images to preload
   * @returns {Promise}
   */
  preloadImages = (amount: number = this.images.length): Promise<void[]> => {
    const decoupledImages = this.images.slice(0, amount)

    return Promise.all(
      decoupledImages.map(async imgPath => {
        const image = await loadImage(imgPath)
        this.cachedImages.set(imgPath, image)
      }),
    )
  }

  /**
   * Starts karavai.
   * It will start logic which updates images on scroll.
   */
  start = (): void => {
    this.startPosition = window.pageYOffset
    this.subscribe()
  }

  /**
   * Stops karavai.
   * It will stop logic which updates images on scroll.
   */
  stop = (): void => {
    this.unsubscribe()
  }

  private subscribe = async (): Promise<void> => {
    this.updateImage(this.images[0])
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
    const isSameFrame = this.currentFrameIndex === nextFrameIndex
    if (isSameFrame || isLastFrame || nextFrameIndex < 0) {
      return
    }

    this.updateImage(this.images[nextFrameIndex])
    this.currentFrameIndex = nextFrameIndex
  }

  private updateImage = async (imagePath: string): Promise<void> => {
    const image = await this.getImage(imagePath)
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
