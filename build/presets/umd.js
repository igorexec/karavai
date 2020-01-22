const {outputs} = require('../constants')

module.exports.umdPreset = {
  output: {
    filename: outputs.karavaiUMD,
    libraryTarget: 'umd'
  }
}
