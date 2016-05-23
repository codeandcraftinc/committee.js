import request from 'supertest-as-promised'
import { app } from '../resources'

describe('@todo', () => {
  xit('@todo', () => {
    return request(app)
      .post('/examples')
      .send()
      .expect(201)
  })
})
