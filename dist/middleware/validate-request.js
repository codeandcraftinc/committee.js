'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateRequest;

var _requestValidator = require('../request-validator');

var _requestValidator2 = _interopRequireDefault(_requestValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @todo
 */
function validateRequest() {
  let opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  const validator = new _requestValidator2.default(opts);
  return validator.middleware.bind(validator);
}