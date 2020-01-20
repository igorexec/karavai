const {entries, paths, outputs} = require('../constants')
const {copyPlugin} = require('../plugins')

module.exports.library = {
  entry: entries.karavai,

  plugins: [copyPlugin([{from: paths.libraryPackage, to: paths.distPackage}])],

  output: {
    filename: outputs.karavai,
    path: paths.distPackage,
    library: 'Karavai',
    libraryExport: 'default',
    libraryTarget: 'umd'
  }
}
