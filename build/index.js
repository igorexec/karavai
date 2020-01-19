const merge = require('webpack-merge')
const {basePreset} = require('./presets')
const {library, preview} = require('./parts')

const createWebpackConfig = lifeCycle => {
  switch (lifeCycle) {
  case 'preview:build':
    return merge.smart(basePreset, preview)
  case 'package:build':
    return merge.smart(basePreset, library)
  default:
    throw new Error('No relative lifeCycle found')
  }
}

module.exports = createWebpackConfig(process.env.npm_lifecycle_event)
