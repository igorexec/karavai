import Karavai from 'lib'

(async (): Promise<void> => {
  const images = Array.from({length: 300}, (_, idx) => `/img/${idx}.jpg`)
  const canvas: HTMLCanvasElement | null = document.querySelector('#canvas')

  if (canvas) {
    const karavai = new Karavai(images, canvas)
    await karavai.preloadImages(30)
    karavai.start()
  }
})()
