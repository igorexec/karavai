const {env} = require('../constants')
const {terserPlugin} = require('../plugins')
const {tsPreset} = require('./typescript')

const commonConfig = {
  mode: env.production ? 'production' : 'development',
  devtool: env.production ? 'hidden-source-map' : 'cheap-module-eval-source-map',
  optimization: {
    minimize: env.production
  },
  stats: env.debug ? 'errors-warnings' : 'errors-only',

  output: {
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].js'
  },
  resolve: {
    symlinks: false,
    extensions: ['.ts']
  }
}

module.exports.basePreset = {
  ...commonConfig,
  optimization: {
    minimizer: [terserPlugin({sourceMap: env.production})]
  },
  module: {
    rules: [tsPreset]
  }
}
