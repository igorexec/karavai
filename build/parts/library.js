const {entries, paths, outputs} = require('../constants')
const {copyPlugin} = require('../plugins')

module.exports.library = {
  entry: entries.karavai,

  plugins: [copyPlugin([{from: paths.libraryPackage, to: paths.distPackage}])],

  stats: 'verbose',

  output: {
    path: paths.distPackage,
    filename: outputs.karavaiES5,
    library: 'Karavai',
    libraryExport: 'default'
  }
}
