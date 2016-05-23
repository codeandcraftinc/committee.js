import Promise from 'bluebird'
import parser from 'json-schema-ref-parser'

/**
 * @todo
 */
export default function expandSchema(schema) {
  return Promise.resolve(parser.dereference(schema))
}
