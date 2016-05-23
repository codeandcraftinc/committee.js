import RequestValidator from '../../lib/request-validator'
import schema from '../resources/schema.json'

describe('RequestValidator', () => {
  it('@todo', () => {
    return (new RequestValidator({
      schema: schema
    })).initialize().then((validator) => {
      return validator.validate({
        body: {},
        method: 'POST',
        originalUrl: '/examples'
      })
    }).then((result) => {
      // console.log(result)
    })
  })
})
