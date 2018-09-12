const Joi = require('joi');
const jsonapi = require('../../src/jsonapi/joiFormatter');

describe('json api route validation formatter', () => {
  it('formats entities', async () => {
    const testEntity = jsonapi.formatEntity({ test: Joi.string(), test2: Joi.number() }, 'test');
    const validationSuccess = Joi.validate(
      {
        id: 1,
        attributes: { test: 'test', test2: 42 },
        relationships: { test3: { data: [{ id: 1, type: 'test3' }, { id: 1, type: 'test4' }] } }
      },
      testEntity
    );
    const validationFail = Joi.validate(
      { id: 1, attributes: { test: 'test', test2: 'rrr' } },
      testEntity
    );

    expect(validationSuccess.error).toEqual(null);
    expect(validationFail.error.name).toEqual('ValidationError');
  });

  it('formats resources', async () => {
    const testResource = jsonapi.formatResource({ test: Joi.string() }, 'test');
    const validationSuccess = Joi.validate({ data: { test: '1' } }, testResource);
    const validationFail = Joi.validate({ test: '1' }, testResource);

    expect(validationSuccess.error).toEqual(null);
    expect(validationFail.error.name).toEqual('ValidationError');
  });

  it('formats collections', async () => {
    const testResource = jsonapi.formatCollection(
      Joi.object().keys({ test: Joi.string(), test2: Joi.string() }),
      'test'
    );
    const validationSuccess = Joi.validate(
      {
        data: [{ test: '1' }, { test2: '1' }],
        meta: { test: 1 },
        links: { test: 1 },
        included: [{ test: 1 }]
      },
      testResource
    );
    const validationFail = Joi.validate([{ test: '1' }, { test2: '1' }], testResource);

    expect(validationSuccess.error).toEqual(null);
    expect(validationFail.error.name).toEqual('ValidationError');
  });
});
