'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.defaults');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.flatten');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lodash7 = require('lodash.get');

var _lodash8 = _interopRequireDefault(_lodash7);

var _lodash9 = require('lodash.map');

var _lodash10 = _interopRequireDefault(_lodash9);

var _jsonSchemaRefParser = require('json-schema-ref-parser');

var _jsonSchemaRefParser2 = _interopRequireDefault(_jsonSchemaRefParser);

var _lodash11 = require('lodash.reduce');

var _lodash12 = _interopRequireDefault(_lodash11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @todo
 */
class AbstractValidator {
  /**
   * @todo
   */
  constructor() {
    let opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    if (this.constructor === AbstractValidator) {
      throw new TypeError('`AbstractValidator` should not be instantiated directly');
    }

    if (!this.middleware || typeof this.middleware !== 'function') {
      throw new TypeError('classes extending `AbstractValidator` must implement the `middleware` method');
    }

    if (!opts.schema) {
      throw new TypeError('`schema` option is required');
    }

    this._init = null;
    this._opts = (0, _lodash4.default)(opts || {}, AbstractValidator.defaults);
    this._routes = null;
    this._schema = null;
  }

  /**
   * @todo
   */
  buildRouteMap(dereferencedSchema) {
    const definitions = (0, _lodash8.default)(dereferencedSchema, 'definitions', {});
    const links = (0, _lodash6.default)((0, _lodash10.default)(definitions, 'links'));

    return (0, _lodash12.default)(links, (memo, link) => {
      if (!link) {
        return memo;
      }

      if (!memo[link.method]) {
        memo[link.method] = [];
      }

      memo[link.method].push([new RegExp('^' + link.href.replace(/\{(.*?)\}/g, '[^/]+') + '$'), link]);

      return memo;
    }, {});
  }

  /**
   * @todo
   * @returns {Promise<Object>}
   */
  dereferenceSchema(schema) {
    return _bluebird2.default.resolve(_jsonSchemaRefParser2.default.dereference((0, _lodash2.default)(schema)));
  }

  /**
   * @todo
   * @returns {Object|Null}
   */
  findRouteSchema(req) {
    const found = this._routes[req.method].find(pair => {
      return pair[0].test(req.path);
    });

    return (0, _lodash8.default)(found, '1');
  }

  /**
   * @todo
   * @returns {Promise<AbstractValidator>}
   */
  initialize() {
    if (this._init) {
      return this._init;
    }

    this._init = this.dereferenceSchema(this._opts.schema).then(schema => {
      this._schema = schema;
      this._routes = this.buildRouteMap(schema);
    }).return(this);

    return this._init;
  }
}

exports.default = AbstractValidator; /**
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
};