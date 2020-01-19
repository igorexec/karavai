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

  preloadImages = () =>
    Promise.all(
      this.images.map(imagePath => preloadImage(imagePath).then(img => this.cachedImages.set(imagePath, img))),
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
    const nextFrameIndex = Math.round(positionFromStart / this.options.threshold)

    const isLastFrame = nextFrameIndex + 1 > this.images.length
    if (isLastFrame || nextFrameIndex < 0) {
      return
    }

    this.drawImageOnCanvas(this.images[nextFrameIndex])
  }

  private drawImageOnCanvas = (imgPath: string) => {
    let image = this.cachedImages.get(imgPath)

    // TODO: if no image, download it, show and add to cache
    if (!image) {
      image = createImage(imgPath)
    }
    this.canvasRef.width = image.width
    this.canvasRef.height = image.height
    if (this.context) {
      this.context.drawImage(image, 0, 0)
    }
  }
}
