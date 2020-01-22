export const drawImageOnCanvas = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D | null,
): void => {
  const {width, height} = image

  canvas.width = width
  canvas.height = height
  if (ctx) {
    ctx.drawImage(image, 0, 0)
  }
}
