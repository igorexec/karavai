export const createImage = (url: string) => {
  const image = new Image()
  image.src = url
  return image
}

export const preloadImage = (imagePath: string): Promise<Event> =>
  new Promise((resolve, reject) => {
    const image = createImage(imagePath)
    image.onload = resolve
    image.onerror = reject
  })
