import Promise from 'bluebird'
import { validate as jsonschema } from 'jsonschema'
import AbstractValidator from './abstract-validator'
import { AbstractError, ContentTypeError, HttpError, NotFoundError, ValidationError } from './errors'

/**
 * @todo
 */
export default class RequestValidator extends AbstractValidator {

  /**
   * @todo
   * @returns {undefined}
   * @throws {ContentTypeError}
   */
  checkContentType(req) {
    if (!~['PATCH', 'POST', 'PUT'].indexOf(req.method)) {
      return
    }

    const schema = this.findRouteSchema(req)
    const expectedType = schema.encType || 'application/json'
    const contentType = req.get('content-type')
    const skipFormParams = this._opts.allowFormParams && (contentType === 'application/x-www-form-urlencoded')

    if (expectedType !== contentType && !skipFormParams) {
      throw new ContentTypeError(`expected \`${expectedType}\`, got \`${contentType}\``)
    }
  }

  /**
   * @todo
   * @returns {undefined}
   * @throws {ValidationError}
   */
  checkRouteSchema(req) {
    const schema = this.findRouteSchema(req)

    if (!schema) {
      if (this._opts.strict) {
        throw new NotFoundError(`\`${req.method} ${req.path}\` was not found`)
      }

      return
    }

    if (!schema.schema) {
      return
    }

    const result = jsonschema(req.body, schema.schema)

    if (result.errors.length) {
      throw new ValidationError(result.errors)
    }
  }

  /**
   * @todo
   */
  middleware(req, res, next) {
    return this.initialize().then(() => {
      return this.validate(req)
    }).then(() => next()).catch(AbstractError, (err) => {
      if (this._opts.throw) {
        throw err
      }

      const http = new HttpError(err)
      res.status(http.status).json(http.toJSON())
    }).catch(next)
  }

  /**
   * @todo
   * @returns {Promise<undefined, ContentTypeError|ValidationError>}
   */
  validate(req) {
    return Promise.try(() => {
      if (this._opts.checkContentType) {
        this.checkContentType(req)
      }

      this.checkRouteSchema(req)
    })
  }
}
