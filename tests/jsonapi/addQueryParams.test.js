const addQueryParams = require('../../src/jsonapi/addQueryParams');

describe('query params helper', () => {
  it('add query params', async () => {
    expect(addQueryParams('/route', { param: 42, test: 'regis' })).toEqual(
      '/route?param=42&test=regis'
    );
    expect(addQueryParams('/route')).toEqual('/route');
    expect(addQueryParams('/route', {})).toEqual('/route');
  });
});
