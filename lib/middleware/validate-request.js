import RequestValidator from '../request-validator'
import { HttpError } from '../errors'

/**
 * @todo
 */
export default function validateRequest(opts = {}) {

  /**
   * @todo
   */
  const validator = new RequestValidator(opts)

  /**
   * @todo
   */
  return (req, res, next) => {
    validator.validate(req).then(() => {
      next()
    }).catch((err) => {
      // throw new HttpError(err)
      const http = new HttpError(err)
      res.status(http.status).json(http.toJSON())
    })
  }
}
