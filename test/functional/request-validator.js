import { expect } from 'chai'
import ContentTypeError from '../../lib/errors/content-type-error'
import RequestValidator from '../../lib/request-validator'
import schema from '../../examples/basic/schema.json'
import ValidationError from '../../lib/errors/validation-error'

describe('RequestValidator', () => {

  it('detects an invalid Content-Type', () => {
    const promise = new RequestValidator({
      schema: schema
    }).initialize().then((validator) => {
      return validator.validate({
        body: { name: 'test' },
        get: () => 'application/vnd.test+json',
        method: 'POST',
        path: '/apps',
        query: {}
      })
    })

    return expect(promise).to.be.rejectedWith(ContentTypeError)
  })

  it('skips Content-Type check when `checkContentType` option is disabled', () => {
    const promise = new RequestValidator({
      checkContentType: false,
      schema: schema
    }).initialize().then((validator) => {
      return validator.validate({
        body: { name: 'test' },
        get: () => 'application/x-www-form-urlencoded',
        method: 'POST',
        path: '/apps',
        query: {}
      })
    })

    return expect(promise).to.be.fulfilled
  })

  it('detects missing parameter(s) in GET requests', () => {
    const promise = new RequestValidator({
      schema: schema
    }).initialize().then((validator) => {
      return validator.validate({
        body: {},
        get: () => 'application/json; charset=utf-8',
        method: 'GET',
        path: '/apps/search',
        query: {}
      })
    })

    return expect(promise).to.be.rejectedWith(ValidationError)
  })

})
