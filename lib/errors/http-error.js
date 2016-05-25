import AbstractError from './abstract-error'
import ContentTypeError from './content-type-error'
import ValidationError from './validation-error'

/**
 * @todo
 */
export default class HttpError extends AbstractError {

  /**
   * @todo
   */
  constructor(error) {
    super(error.message)

    const map = HttpError.errors.get(error.constructor) || {
      id: 'internal_server_error',
      status: 500
    }

    this.error = error
    this.id = map.id
    this.status = map.status
  }

  /**
   * @todo
   */
  toJSON() {
    return {
      id: this.id,
      message: this.message
    }
  }
}

/**
 * @todo
 */
const errors = HttpError.errors = new Map()
errors.set(ContentTypeError, { id: 'bad_request', status: 400 })
errors.set(ValidationError, { id: 'unprocessable_entity', status: 422 })
