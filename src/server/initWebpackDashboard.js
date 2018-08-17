/* eslint-disable global-require */

/**
 * Adds a webpack middleware to the server to use webpack-dashboard in dev mode.
 *
 * @param server Hapi server
 * @param config Webpack config
 * @return boolean true on success, false on failure
 */
module.exports = (server, config = {}) => {
  // Don't use this feature if webpack-dashboard requirements are not installed
  try {
    const webpack = require('webpack');
    const DashboardPlugin = require('webpack-dashboard/plugin');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const defaultConfig = require('./webpack.config.js');

    const compiler = webpack(Object.assign({}, defaultConfig, config));
    compiler.apply(new DashboardPlugin());
    const devMiddleware = webpackDevMiddleware(compiler, {
      host: server.info.host,
      port: server.info.port,
      quiet: true
    });
    server.ext({
      type: 'onRequest',
      method: (request, h) => devMiddleware(request.raw.req, request.raw.res, () => h.continue)
    });

    return true;
  } catch (error) {
    return false;
  }
};
