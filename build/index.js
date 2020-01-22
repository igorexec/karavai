const merge = require('webpack-merge')
const {basePreset, devServerPreset} = require('./presets')
const {library, preview} = require('./parts')

const createWebpackConfig = lifeCycle => {
  switch (lifeCycle) {
  case 'preview:build':
    return merge.smart(basePreset, preview)
  case 'package:build:es5':
  case 'package:build:umd':
    return merge.smart(basePreset, library)
  case 'preview:start':
    return merge.smart(basePreset, preview, devServerPreset)
  default:
    throw new Error('No relative lifeCycle found')
  }
}

module.exports = createWebpackConfig(process.env.npm_lifecycle_event)
