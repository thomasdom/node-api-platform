# node-api-platform
A set of tools to help you enjoy hapi + jsonapi

## Usage

### Installation
```
yarn add node-api-platform
```

### Features

#### Server

`initWebpackDashboad` adds a wepack dashboard to your hapi server

`initSwaggerHapi` adds a swagger-ui to your hapi server

`loadRoutes` dynamically loads routes from a glob expression. 
Adds the possibility to use a class method instead of a string as a handler, using the following syntax: `handler: 'Class:Method'`

`environments` a set of env constants (dev, test, preprod, prod)

Here is a fully-fledged usage example:

```
const Hapi = require('hapi');
const {
  initWebpackDashboad,
  initSwaggerHapi,
  loadRoutes,
  environments
} = require('node-api-platform');

(async () => {
  const dev = process.env.ENV !== environments.ENV_PROD;
  const server = await new Hapi.Server({ port: process.env.NODE_PORT, host: process.env.NODE_HOST });

  if (dev) {
    initWebpackDashboad(server);
    await initSwaggerHapi(server, { info: { title: 'Test API Documentation' } });
  }

  loadRoutes(server, __dirname, '**/*.route.js');

  await server.start();
})();

```

#### JsonApi
`jsonApiConstants` a set of json api constants (such as headers)

`jsonApiJoiFormatter` helps you format your hapi-routes validation according to the jsonapi spec

`addQueryParams` formats a route with query params


## Contributing

See CONTRIBUTING.md