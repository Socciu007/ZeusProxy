const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  target: "node",
};
