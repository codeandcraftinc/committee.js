'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.groupby');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.sample');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.map');

var _lodash6 = _interopRequireDefault(_lodash5);

var _abstractError = require('./abstract-error');

var _abstractError2 = _interopRequireDefault(_abstractError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const priorities = ['required', 'type', 'pattern', 'format'];

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
  if (!errors) return '';

  let groups = (0, _lodash2.default)(errors, 'name');
  let selectedGroup;

  priorities.some(priority => {
    selectedGroup = groups[priority];
    return selectedGroup;
  });
  // if there are no 'important' validation errors, just pick one
  if (!selectedGroup) selectedGroup = (0, _lodash4.default)(groups);

  let message = selectedGroup[0].name + ' error: ' + (0, _lodash6.default)(selectedGroup, 'stack').join(', ');
  return message;
};