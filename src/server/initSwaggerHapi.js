const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');

/**
 * Register the swagger-hapi plugin in the server.
 *
 * @param server Hapi server
 * @param customOptions Options for swagger-hapi
 *
 * @returns server
 */
module.exports = (server, customOptions = {}) => {
  const options = Object.assign(
    {},
    {
      schemes: ['http', 'https'],
      deReference: true,
      xProperties: false
    },
    customOptions
  );

  return server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options
    }
  ]);
};
