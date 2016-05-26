'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.merge');

var _lodash4 = _interopRequireDefault(_lodash3);

var _jsonschema = require('jsonschema');

var _abstractValidator = require('./abstract-validator');

var _abstractValidator2 = _interopRequireDefault(_abstractValidator);

var _errors = require('./errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @todo
 */
class RequestValidator extends _abstractValidator2.default {

  /**
   * @todo
   * @returns {undefined}
   * @throws {ContentTypeError}
   */
  checkContentType(req) {
    const contentType = req.get('content-type');
    const expectedType = (0, _lodash2.default)(this.findRouteSchema(req), 'encType', 'application/json');
    const expectedRe = new RegExp(expectedType);
    const isValidContentType = expectedRe.test(contentType);
    const skipFormParams = this._opts.allowFormParams && contentType === 'application/x-www-form-urlencoded';

    // skip if body is empty and either a) no content type is defined, or
    // b) invalid content type is defined
    if ((!contentType || !isValidContentType) && this.isEmptyRequest(req)) {
      return;
    }

    if (!isValidContentType && !skipFormParams) {
      throw new _errors.ContentTypeError(`expected the request header "Content-Type" to be \`${ expectedType }\`, got \`${ contentType }\` instead`);
    }
  }

  /**
   * @todo
   * @returns {undefined}
   * @throws {ValidationError}
   */
  checkRouteSchema(req) {
    const schema = this.findRouteSchema(req);

    if (!schema) {
      if (this._opts.strict) {
        throw new _errors.NotFoundError(`\`${ req.method } ${ req.path }\` was not found`);
      }

      return;
    }

    if (!schema.schema) {
      return;
    }

    const data = (0, _lodash4.default)({}, req.body, this._opts.allowQueryParams ? req.query : {});
    const result = (0, _jsonschema.validate)(data, schema.schema);

    if (result.errors.length) {
      throw new _errors.ValidationError(result.errors);
    }
  }

  /**
   * @todo
   * @returns {Boolean}
   */
  isEmptyRequest(req) {
    if (~['DELETE', 'GET'].indexOf(req.method) || !Object.keys(req.body).length) {
      return true;
    }

    return false;
  }

  /**
   * @todo
   */
  middleware(req, res, next) {
    return this.initialize().then(() => {
      return this.validate(req);
    }).then(() => next()).catch(_errors.AbstractError, err => {
      if (this._opts.throw) {
        throw err;
      }

      const http = new _errors.HttpError(err);
      res.status(http.status).json(http.toJSON());
    }).catch(next);
  }

  /**
   * @todo
   * @returns {Promise<undefined, ContentTypeError|ValidationError>}
   */
  validate(req) {
    return _bluebird2.default.try(() => {
      if (this._opts.checkContentType) {
        this.checkContentType(req);
      }

      this.checkRouteSchema(req);
    });
  }
}
exports.default = RequestValidator;