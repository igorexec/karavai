import { createImage } from './image';

export default class Karavai {
  private stream: string[];

  private loadedImages: string[] = [];

  private canvas: HTMLCanvasElement;

  private options: object;

  constructor(stream: string[], canvasRef: HTMLCanvasElement, options: object = {}) {
    this.stream = stream;
    this.canvas = canvasRef;
    this.options = options;
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
}
