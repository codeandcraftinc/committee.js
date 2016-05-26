import groupBy from 'lodash.groupby'
import sample from 'lodash.sample'
import map from 'lodash.map'
import AbstractError from './abstract-error'

const priorities = ['required', 'type', 'pattern', 'format']

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
  if (!errors)
    return ''

  let groups = groupBy(errors, 'name')
  let selectedGroup;

  priorities.some((priority) => {
    selectedGroup = groups[priority]
    return selectedGroup
  })
  // if there are no 'important' validation errors, just pick one
  if (!selectedGroup)
    selectedGroup = sample(groups)

  let message = selectedGroup[0].name + ' error: ' + map(selectedGroup, 'stack').join(', ')
  return message
}
