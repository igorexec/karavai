const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    main: path.join(__dirname, "src/index.ts")
  },
  mode: isProduction ? "production" : "development",
  devtool: !isProduction ? "inline-source-map" : undefined,

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      }
    ]
  },

  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".ts", ".js"]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html")
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "public/img"),
        to: path.join(__dirname, "dist/img")
      }
    ])
  ],

  output: {
    filename: "[name].[contenthash:8].js",
    path: path.join(__dirname, "dist"),
    library: "Karavai",
    libraryExport: "default"
  },

  devServer: {
    port: 3334
  }
};
