const TerserPlugin = require('terser-webpack-plugin')

module.exports.terserPlugin = ({sourceMap}) => {
  return new TerserPlugin({
    sourceMap,
    cache: true,
    parallel: true,
    terserOptions: {
      mangle: {
        safari10: true
      }
    }
  })
}
