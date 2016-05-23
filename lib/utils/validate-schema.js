import Promise from 'bluebird'

/**
 * @todo
 */
export default function validateSchema(schema) {
  return Promise.resolve(parser.dereference(schema))
}
