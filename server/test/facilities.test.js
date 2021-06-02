const request = require('supertest')
const app = require('../app')

describe('GET /api/facilities/{id}', () => {

  it('should repond with JSON and a 200 status code for a valid facility', done => {
    request(app)
      .get('/api/facilities/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})
