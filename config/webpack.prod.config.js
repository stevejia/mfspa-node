const path = require("path");
const cwd = process.cwd();
module.exports = {
  entry: ["./src/index.ts"],
  mode: "development",
  output: {
    filename: "index.js",
    path: path.join(cwd, "/dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js|jsx|ts|tsx$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
