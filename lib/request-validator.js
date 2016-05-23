import { validate as jsonschema } from 'jsonschema'
import AbstractValidator from './abstract-validator'

/**
 * @todo
 */
export default class RequestValidator extends AbstractValidator {
  /**
   * @todo
   */
  validate(req) {
    const schema = this.findRouteSchema(req)
    const result = jsonschema(req.body, schema.schema)

    return result
  }
}
