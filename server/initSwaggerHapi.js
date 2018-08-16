const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');

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

  server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options
    }
  ]);
};
