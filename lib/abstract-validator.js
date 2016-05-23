import Promise from 'bluebird'
import defaults from 'lodash.defaults'
import { buildRoutes, expandSchema } from './utils'

/**
 * @todo
 */
export default class AbstractValidator {
  /**
   * @todo
   */
  constructor(opts = {}) {
    if (this.constructor === AbstractValidator) {
      throw new Error('`AbstractValidator` should not be instantiated directly')
    }

    const abstractDefaults = AbstractValidator.defaults
    const classDefaults = this.constructor.defaults

    this.opts = defaults(opts || {}, classDefaults, abstractDefaults)

    if (!this.opts.schema) {
      throw new TypeError('`schema` option is required')
    }

    if (!this.validate || typeof this.validate !== 'function') {
      throw new TypeError('classes extending `AbstractValidator` must implement the `validate` method')
    }
  }

  /**
   * @todo
   * @returns {Promise}
   */
  initialize() {
    if (this._init) {
      return this._init
    }

    this._init = expandSchema(this.opts.schema).then((schema) => {
      return [schema, buildRoutes(schema)]
    }).spread((schema, routes) => {
      this._schema = schema
      this._routes = routes
    }).return(this)

    return this._init
  }

  /**
   * @todo
   * @returns {Object}
   */
  findRouteSchema(req) {
    const found = this._routes[req.method].find((pair) => {
      return pair[0].test(req.originalUrl)
    })

    return found ? found[1] : {}
  }
}

/**
 * @todo
 */
AbstractValidator.defaults = {
  schema: null
}
