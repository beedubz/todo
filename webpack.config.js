const path = require("path");
// 1. Import the plugin at the top
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Optional: Cleans the dist folder before every build
  },
  // 2. Add the plugins section
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html", // Use this file as a blueprint
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i, // Look for .css files
        use: ["style-loader", "css-loader"], // Process them with these loaders
      },
    ],
  },
};
