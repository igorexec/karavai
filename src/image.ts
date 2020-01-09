export const createImage = (url: string) => {
  const image = new Image()
  image.src = url
  return image
}
