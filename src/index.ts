import Karavai from '../lib/index'

(async () => {
  const images = Array.from({length: 40}, (_, idx) => `/img/${idx}.jpg`)
  const canvas: HTMLCanvasElement | null = document.querySelector('#canvas')

  if (canvas) {
    const karavai = new Karavai(images, canvas)
    await karavai.preloadImages()
    karavai.start()
  }
})()
