'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _abstractError = require('./abstract-error');

var _abstractError2 = _interopRequireDefault(_abstractError);

var _contentTypeError = require('./content-type-error');

var _contentTypeError2 = _interopRequireDefault(_contentTypeError);

var _validationError = require('./validation-error');

var _validationError2 = _interopRequireDefault(_validationError);

var _notFoundError = require('./not-found-error');

var _notFoundError2 = _interopRequireDefault(_notFoundError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @todo
 */
class HttpError extends _abstractError2.default {

  /**
   * @todo
   */
  constructor(error) {
    super(error.message);

    const map = HttpError.errors.get(error.constructor) || {
      id: 'internal_server_error',
      status: 500
    };

    this.error = error;
    this.id = map.id;
    this.status = map.status;
  }

  /**
   * @todo
   */
  toJSON() {
    return {
      id: this.id,
      message: this.message
    };
  }
}

exports.default = HttpError; /**
                              * @todo
                              */

const errors = HttpError.errors = new Map();
errors.set(_contentTypeError2.default, { id: 'bad_request', status: 400 });
errors.set(_notFoundError2.default, { id: 'not_found', status: 404 });
errors.set(_validationError2.default, { id: 'unprocessable_entity', status: 422 });