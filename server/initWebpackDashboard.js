const webpack = require('webpack');
const dashboardPlugin = require('webpack-dashboard/plugin');
const webpackDevMiddleware = require('webpack-dev-middleware');
const defaultConfig = require('./webpack.config.js');

/**
 *
 * @param server Hapi server
 * @param config Webpack config
 */
module.exports = (server, config = {}) => {
  const compiler = webpack(Object.assign({}, defaultConfig, config));
  compiler.apply(new dashboardPlugin());
  const devMiddleware = webpackDevMiddleware(
    compiler,
    { host: server.info.host, port: server.info.port, quiet: true }
  );
  server.ext({
    type: 'onRequest',
    method: (request, h) => devMiddleware(request.raw.req, request.raw.res, () => h.continue)
  });
};