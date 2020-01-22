export const preloadImage = (imagePath: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject): void => {
    const image = new Image()
    image.src = imagePath
    image.onload = (): void => resolve(image)
    image.onerror = reject
  })
