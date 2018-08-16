var nodeExternals = require('webpack-node-externals');

module.exports = {
  context: __dirname + "/app",
  mode: "development",
  entry: './server.js',
  target: "node",
  externals: [nodeExternals()]
};
