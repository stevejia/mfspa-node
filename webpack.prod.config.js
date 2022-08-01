const NodePolyfillWebpackPlugin = require("node-polyfill-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const path = require("path");
const cwd = process.cwd();
module.exports = {
  entry: ["./src/scripts/index.ts"],
  mode: "production",
  output: {
    filename: "index.js",
    path: path.join(cwd, "/dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.js|jsx|ts|tsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      async_hooks: false,
    },
  },
  target: "node",
  externals: [nodeExternals()],
  plugins: [new NodePolyfillWebpackPlugin()],
};
