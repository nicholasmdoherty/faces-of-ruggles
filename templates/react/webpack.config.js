const webpack = require("webpack");
const resolve = require("path").resolve;
const config = {
  entry: __dirname + "/index.js",
  output: {
    path: resolve("../../public"),
    filename: "bundle.js",
    publicPath: resolve("../../public")
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              disable: true // webpack@2.x and newer
            }
          }
        ]
      }
    ]
  }
};
module.exports = config;
