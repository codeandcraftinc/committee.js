'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _abstractError = require('./abstract-error');

var _abstractError2 = _interopRequireDefault(_abstractError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @todo
 */
class ContentTypeError extends _abstractError2.default {}
exports.default = ContentTypeError;