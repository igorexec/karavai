const {entries, paths} = require('../constants')
const {htmlPlugin, copyPlugin} = require('../plugins')

module.exports.preview = {
  entry: {
    main: entries.preview
  },

  plugins: [htmlPlugin(), copyPlugin([{from: paths.staticImgs, to: paths.distImg}])]
}
