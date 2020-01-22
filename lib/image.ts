export const createImage = (url: string): HTMLImageElement => {
  const image = new Image()
  image.src = url
  return image
}

export const preloadImage = (imagePath: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject): void => {
    const image = createImage(imagePath)
    image.onload = (): void => resolve(image)
    image.onerror = reject
  })
