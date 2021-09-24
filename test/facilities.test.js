const request = require('supertest')
const app = require('../app')
const { createDbTables, removeDbTables, createUser, loginGetToken } = require('./test-utils')
let token = null;

describe('/api/facilities', () => {
  
  before(async() => {
    await createDbTables()
    await createUser('newuser@gmail.com', 'password')
    token = await loginGetToken('newuser@gmail.com', 'password')
  })
  
  after(async () => {
    await removeDbTables()
  })

  describe('POST /api/facilities', () => {

    it('should respond with a 201 status code when creating new facility', done => {
      request(app)
        .post('/api/facilities')
        .send({name: 'Test Club', description: 'A great place'})
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done);
    })

    it('should respond with a 422 status code for missing facility info in request body', done => {
      request(app)
        .post('/api/facilities')
        .send({})
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422, done);
    })
  })

  describe('GET /api/facilities/by_user', () => {

    it('should respond with JSON and a 200 status code', done => {
      request(app)
        .get('/api/facilities/by_user')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    })
  })

  describe('GET /api/facilities/{id}', () => {

    it('should respond with JSON and a 200 status code for a valid facility id', done => {
      request(app)
        .get('/api/facilities/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    })

    it('should respond with a 422 status code for an invalid facility id', done => {
      request(app)
        .get('/api/facilities/999')
        .expect(422, done);
    })

    it('should respond with a 422 status code for a non-integer id', done => {
      request(app)
        .get('/api/facilities/test')
        .expect(422, done);
    })
  })

  describe('DELETE /api/facilities/{id}', () => {

    it('should respond with a 204 status code when deleting a facility', done => {
      request(app)
      .delete('/api/facilities/1')
      .send()
      .set('Authorization', `Bearer ${token}`)
      .expect(204, done)
    })

    it('should respond with a 422 status code when trying to delete a non-integer facility', done => {
      request(app)
      .delete('/api/facilities/test')
      .expect(422, done)
    })
  })
})
