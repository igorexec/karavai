const {entries, paths, outputs, env} = require('../constants')
const {copyPlugin} = require('../plugins')

const getTarget = () => {
  switch (env.type) {
  case 'UMD':
    return {filename: outputs.karavaiUMD, libraryTarget: 'umd'}
  default:
    return {filename: outputs.karavaiES5}
  }
}

module.exports.library = {
  entry: entries.karavai,

  plugins: [copyPlugin([{from: paths.libraryPackage, to: paths.distPackage}])],

  stats: 'verbose',

  output: {
    path: paths.distPackage,
    library: 'Karavai',
    libraryExport: 'default',
    ...getTarget()
  }
}
