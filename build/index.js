const merge = require('webpack-merge')
const {basePreset} = require('./presets')
const {library} = require('./parts')

const createWebpackConfig = lifeCycle => {
  switch (lifeCycle) {
  case 'package:build':
    return merge.smart(basePreset, library)
  default:
    throw new Error('No relative lifeCycle found')
  }
}

module.exports = createWebpackConfig(process.env.npm_lifecycle_event)
