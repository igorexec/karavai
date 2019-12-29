export default class Karavai {
  private stream: string[];

  constructor(stream: string[]) {
    this.stream = stream;
  }

  preloadImages = () => {
    this.stream.forEach((imgPath) => {
      const img = new Image();
      img.src = imgPath;
    });
  };
}
