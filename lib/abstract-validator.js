import Promise from 'bluebird'
import cloneDeep from 'lodash.clonedeep'
import defaults from 'lodash.defaults'
import flatten from 'lodash.flatten'
import get from 'lodash.get'
import map from 'lodash.map'
import parser from 'json-schema-ref-parser'
import reduce from 'lodash.reduce'

/**
 * @todo
 */
export default class AbstractValidator {
  /**
   * @todo
   */
  constructor(opts = {}) {
    if (this.constructor === AbstractValidator) {
      throw new TypeError('`AbstractValidator` should not be instantiated directly')
    }

    if (!this.middleware || typeof this.middleware !== 'function') {
      throw new TypeError('classes extending `AbstractValidator` must implement the `middleware` method')
    }

    if (!opts.schema) {
      throw new TypeError('`schema` option is required')
    }

    this._init = null
    this._opts = defaults(opts || {}, AbstractValidator.defaults)
    this._routes = null
    this._schema = null
  }

  /**
   * @todo
   */
  buildRouteMap(dereferencedSchema) {
    const definitions = get(dereferencedSchema, 'definitions', {})
    const links = flatten(map(definitions, 'links'))

    return reduce(links, (memo, link) => {
      if (!link) {
        return memo
      }

      if (!memo[link.method]) {
        memo[link.method] = []
      }

      memo[link.method].push([
        new RegExp('^' + link.href.replace(/\{(.*?)\}/, '[^/]+') + '$'),
        link
      ])

      return memo
    }, {})
  }

  /**
   * @todo
   * @returns {Promise<Object>}
   */
  dereferenceSchema(schema) {
    return Promise.resolve(parser.dereference(cloneDeep(schema)))
  }

  /**
   * @todo
   * @returns {Object|Null}
   */
  findRouteSchema(req) {
    const found = this._routes[req.method].find((pair) => {
      return pair[0].test(req.path)
    })

    return get(found, '1')
  }

  /**
   * @todo
   * @returns {Promise<AbstractValidator>}
   */
  initialize() {
    if (this._init) {
      return this._init
    }

    this._init = this.dereferenceSchema(this._opts.schema).then((schema) => {
      this._schema = schema
      this._routes = this.buildRouteMap(schema)
    }).return(this)

    return this._init
  }
}

/**
 * @todo
 */
AbstractValidator.defaults = {
  allowFormParams: true,
  allowQueryParams: true,
  checkContentType: true,
  // error_class: false,
  throw: false,
  schema: null,
  strict: false
}
