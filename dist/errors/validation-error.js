'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.groupby');

var _lodash2 = _interopRequireDefault(_lodash);

var _abstractError = require('./abstract-error');

var _abstractError2 = _interopRequireDefault(_abstractError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @todo
 */
class ValidationError extends _abstractError2.default {

  /**
   * @todo
   * @param {Array} errors An array of `jsonschema` `ValidationError`s.
   */
  constructor(errors) {
    super(ValidationError.generateErrorMessage(errors));
  }
}

exports.default = ValidationError; /**
                                    * @todo
                                    * @param {Array} errors An array of `jsonschema` `ValidationError`s.
                                    */

ValidationError.generateErrorMessage = function generateErrorMessage(errors) {
  return '@TODO';
};