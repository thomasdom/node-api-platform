const qs = require('qs');

/**
 * Adds query params to a route.
 *
 * @param route A route like '/route'
 * @param options QueryParams object like { page: 1, limit: 20 }
 * @returns {string}
 */
module.exports = (route, options = {}) => [route, qs.stringify(options)].filter(e => !!e).join('?');
