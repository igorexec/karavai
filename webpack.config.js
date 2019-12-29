const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    main: path.join(__dirname, 'src/index.js'),
  },

  mode: isProduction ? 'production' : 'development',

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
};
