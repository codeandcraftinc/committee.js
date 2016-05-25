import { validate as jsonschema } from 'jsonschema'
import AbstractValidator from './abstract-validator'
import { ContentTypeError, HttpError, ValidationError } from './errors'

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
   */
  middleware(req, res, next) {
    return this.validate(req).then(() => {
      next()
    }).catch((err) => {
      if (this._opts.throw) {
        throw err
      }

      const http = new HttpError(err)
      res.status(http.status).json(http.toJSON())
    })
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
