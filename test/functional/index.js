import request from 'supertest-as-promised'
import { app } from '../resources'

describe('@todo', () => {
  it('@todo', () => {
    return request(app)
      .post('/examples')
      .set('Content-Type', 'application/json')
      .send()
      .expect(201)
  })
})
