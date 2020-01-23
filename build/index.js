const merge = require('webpack-merge')
const {basePreset, devServerPreset, umdPreset} = require('./presets')
const {library, preview} = require('./parts')

const createWebpackConfig = lifeCycle => {
  switch (lifeCycle) {
  case 'package:build:es5':
    return merge.smart(basePreset, library)
  case 'package:build:umd':
    return merge.smart(basePreset, library, umdPreset)
  case 'preview:build':
    return merge.smart(basePreset, preview)
  case 'preview:start':
    return merge.smart(basePreset, preview, devServerPreset)
  default:
    throw new Error('No relative lifeCycle found')
  }
}

module.exports = createWebpackConfig(process.env.npm_lifecycle_event)
