const HtmlWebpackPlugin = require('html-webpack-plugin')
const {paths} = require('../constants')

module.exports.htmlPlugin = () =>
  new HtmlWebpackPlugin({
    template: paths.htmlFile
  })
