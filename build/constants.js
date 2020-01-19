const path = require('path')

const PRODUCTION = process.env.NODE_ENV === 'production'
const DEBUG = process.env.DEBUG === 'debug'
const PORT = process.env.PORT || 8080

const root = path.resolve(__dirname, '..')
const library = path.resolve(root, 'lib')
const src = path.resolve(root, 'src')
const dist = path.resolve(root, 'dist')
const distPackage = path.resolve(root, 'out-pkg')
const libraryPackage = path.resolve(library, 'package.json')
const types = path.resolve(root, '@types')
const libraryTypes = path.resolve(types, 'lib/index.d.ts')
const static = path.resolve(root, 'public')
const htmlFile = path.resolve(static, 'index.html')
const distImg = path.resolve(dist, 'img')
const staticImgs = path.resolve(static, 'img')

module.exports = {
  env: {
    production: PRODUCTION,
    debug: DEBUG,
    port: PORT
  },
  entries: {
    karavai: path.resolve(library, 'index.ts'),
    preview: path.resolve(src, 'index.ts')
  },
  outputs: {
    karavai: 'index.js'
  },
  paths: {
    root,
    library,
    src,
    dist,
    distPackage,
    libraryPackage,
    libraryTypes,
    htmlFile,
    distImg,
    staticImgs
  }
}
