const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports.copyPlugin = config => new CopyWebpackPlugin(config)
