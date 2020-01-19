const {tsLoader} = require('../loaders')

module.exports.tsPreset = {
  test: /\.ts$/,
  exclude: /node_modules/,
  use: [tsLoader()]
}
