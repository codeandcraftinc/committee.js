import RequestValidator from '../request-validator'

/**
 * @todo
 */
export default function validateRequest(opts = {}) {
  const validator = new RequestValidator(opts)
  return validator.middleware.bind(validator)
}
