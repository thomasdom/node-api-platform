const Joi = require('joi');

/**
 * Formats an entity according to the jsonapi spec.
 *
 * @param attributes An object containing validation keys such as { name: Joi.string() }
 * @param name Name of the object to be serialized
 *
 * @returns Joi.object
 */
const formatEntity = (attributes, name) =>
  Joi.object()
    .keys({
      id: Joi.number().required(),
      type: Joi.string(),
      links: Joi.object(),
      attributes: Joi.object(attributes).label(`${name}Attributes`)
    })
    .label(name);

/**
 * Formats a joi object into a jsonapi joi object, wrapping everything into a data key.
 *
 * @param data A Joi object
 * @param name Name of the object
 *
 * @returns Joi.object
 */
const formatResource = (data, name) =>
  Joi.object()
    .keys({ data, links: Joi.object(), included: Joi.array(), meta: Joi.object() })
    .required()
    .label(`JsonApi${name}Container`);

/**
 * Formats a joi object into a jsonapi collection validator.
 *
 * @param data A Joi object
 * @param name Name of the object
 *
 * @returns Joi.object
 */
const formatCollection = (data, name) =>
  formatResource(
    Joi.array()
      .required()
      .items(data)
      .label(`${name}Data`),
    name
  );

module.exports = { formatCollection, formatResource, formatEntity };
