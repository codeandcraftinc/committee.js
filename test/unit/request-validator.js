import RequestValidator from '../../lib/request-validator'
import schema from '../resources/schema.json'

describe('RequestValidator', () => {
  xit('@todo', () => {
    return (new RequestValidator({
      schema: schema
    })).initialize().then((validator) => {
      return validator.validate({
        get: () => 'something',
        body: {},
        method: 'POST',
        originalUrl: '/examples'
      })
    }).then((result) => {
      // console.log(result)
    }).catch(console.log.bind(console))
  })
})
