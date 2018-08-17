const Joi = require('joi');

const formatEntity = (attributes, name) =>
  Joi.object()
    .keys({
      id: Joi.number(),
      attributes: Joi.object(attributes).label(`${name}Attributes`)
    })
    .label(name);

const formatResource = (data, name) =>
  Joi.object()
    .keys({ data })
    .label(`JsonApi${name}Container`);

const formatCollection = (data, name) =>
  formatResource(
    Joi.array()
      .required()
      .items(data)
      .label(`${name}Data`),
    name
  );

module.exports = { formatCollection, formatResource, formatEntity };
