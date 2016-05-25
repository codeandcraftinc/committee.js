import { validate as jsonschema } from 'jsonschema'
import AbstractValidator from './abstract-validator'
import { ContentTypeError, ValidationError } from './errors'

/**
 * @todo
 */
export default class RequestValidator extends AbstractValidator {

  /**
   * @todo
   * @returns {Boolean}
   * @throws {ContentTypeError}
   */
  checkContentType(req) {
    const schema = this.findRouteSchema(req)
    const expectedType = schema.encType || 'application/json'
    const contentType = req.get('content-type')

    if (expectedType !== contentType) {
      throw new ContentTypeError(`expected \`${expectedType}\`, got \`${contentType}\``)
    }

    return true
  }

  /**
   * @todo
   * @returns {Boolean}
   * @throws {ValidationError}
   */
  checkRouteSchema(req) {
    const schema = this.findRouteSchema(req)
    const result = jsonschema(req.body, schema.schema)

    if (result.errors) {
      throw new ValidationError(result.errors)
    }

    return true
  }

  /**
   * @todo
   * @returns {Promise<Boolean, ContentTypeError|ValidationError>}
   */
  validate(req) {
    return this.initialize().then(() => {
      this.checkContentType(req)
      this.checkRouteSchema(req)
    }).return(true)
  }
}
