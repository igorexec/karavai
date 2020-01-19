const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    index: path.join(__dirname, 'lib/index.ts')
  },

  mode: 'production',

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  },

  resolve: {
    extensions: ['.ts']
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'package.json'),
        to: path.join(__dirname, 'dist-lib')
      },
      {
        from: path.join(__dirname, '@types/lib/index.d.ts'),
        to: path.join(__dirname, 'dist-lib')
      }
    ])
  ],

  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist-lib'),
    library: 'Karavai',
    libraryExport: 'default',
    libraryTarget: 'umd'
  }
}
