const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    main: path.join(__dirname, 'src/index.js'),
  },

  mode: isProduction ? 'production' : 'development',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: ['@babel/preset-env'],
        },
      },
    ],
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
};
