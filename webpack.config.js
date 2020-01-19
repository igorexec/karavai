// const path = require('path')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

// module.exports = {
//   entry: {
//     index: path.join(__dirname, 'lib/index.ts')
//   },

//   plugins: [
//     new CopyWebpackPlugin([
//       {
//         from: path.join(__dirname, 'package.json'),
//         to: path.join(__dirname, 'out-pkg')
//       },
//       {
//         from: path.join(__dirname, '@types/lib/index.d.ts'),
//         to: path.join(__dirname, 'out-pkg')
//       }
//     ])
//   ],

//   output: {
//     filename: 'index.js',
//     path: path.join(__dirname, 'out-pkg'),
//     library: 'Karavai',
//     libraryExport: 'default',
//     libraryTarget: 'umd'
//   }
// }
module.exports = require('./build')
