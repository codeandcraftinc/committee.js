import groupBy from 'lodash.groupby'
import AbstractError from './abstract-error'

/**
 * @todo
 */
export default class ValidationError extends AbstractError {

  /**
   * @todo
   * @param {Array} errors An array of `jsonschema` `ValidationError`s.
   */
  constructor(errors) {
    super(ValidationError.generateErrorMessage(errors))
  }
}

/**
 * @todo
 * @param {Array} errors An array of `jsonschema` `ValidationError`s.
 */
ValidationError.generateErrorMessage = function generateErrorMessage(errors) {
  return '@TODO'
}
