# Karavai JS

## KaravaiJS - Images sequence scrolling engine

## [Demo](https://karavai.netlify.com)

## Installation

### CDN

```html
<script src="https://unpkg.com/karavai@latest/karavai.es5.js"></script>
```

### UMD

```bash
yarn add --exact karavai
```

```bash
npm install --save-exact karavai
```

## Usage

```javascript
// import package. You can miss this step for CDN installation
import Karavai from 'karavai';

const images = [...];
const canvasRef = document.querySelector('#my');

const karavai = new Karavai(images, canvasRef);

(async () => {
  await karavai.preloadImages()
  karavai.start()
}())
```

## Configuration

Options

```javascript
const options = {
  // Number
  // images change threshold in pixels.
  // Means: every N pixels, update image to the next one
  // Default: 30
  threshold: 30
};
const karavai = new Karavai(images, canvasRef, options);
karavai.start();
```

### API

preloadImages(amount: number) - preloads provided amount of images. _Default: all images. Returns: Promise_. Preload is not required, but strongly recommended

```javascript
const karavai = new Karavai(images, canvasRef);
karavai.preloadImages(); // -> Promise
```

start() - start karavai. It will start logic which updates images on scroll.

```javascript
const karavai = new Karavai(images, canvasRef);
karavai.start();
```

stop() - stop karavai. It will stop logic which updates images on scroll.

```javascript
const karavai = new Karavai(images, canvasRef);
karavai.stop();
```

## License

Karavai.js is freely distributable under the terms of the [MIT license](https://github.com/igorexec/karavai/blob/master/LICENSE).
