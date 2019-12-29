export default class Karavai {
  private stream: string[];

  private canvas: HTMLCanvasElement;

  constructor(stream: string[], canvasRef: HTMLCanvasElement) {
    this.stream = stream;
    this.canvas = canvasRef;
  }

  preloadImages = () => {
    this.stream.forEach((imgPath) => {
      const img = new Image();
      img.src = imgPath;
    });
  };
}
