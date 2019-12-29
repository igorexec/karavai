import { createImage } from './image';

export default class Karavai {
  private stream: string[];

  private loadedImages: string[] = [];

  private canvas: HTMLCanvasElement;

  private context: CanvasRenderingContext2D | null;

  private options: object;

  constructor(stream: string[], canvasRef: HTMLCanvasElement, options: object = {}) {
    this.stream = stream;
    this.canvas = canvasRef;
    this.options = options;
    this.context = canvasRef.getContext('2d');
  }

  preloadImages = () => new Promise((resolve, reject) => {
    this.stream.forEach((imgPath) => {
      createImage(imgPath, {
        onLoad: () => {
          this.onImageLoad(imgPath);
          if (this.loadedImages.length === this.stream.length) resolve();
        },
        onError: (err: Event | string) => reject(err),
      });
    });
  });

  private onImageLoad = (imgPath: string) => {
    this.loadedImages.push(imgPath);
  };

  private drawImageOnCanvas = (imgPath: string) => {
    const image = new Image();
    image.src = imgPath;
    image.onload = () => {
      if (this.context) {
        this.context.drawImage(image, 0, 0);
      }
    };
  };
}
