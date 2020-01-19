const {env} = require('../constants')

module.exports.devServerPreset = {
  devServer: {
    hot: false,
    port: env.port
  }
}
