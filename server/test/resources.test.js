const request = require('supertest')
const app = require('../app')
const { createDbTables, removeDbTables, createUser, loginGetToken } = require('./test-utils')
let token = null;

describe('/api/resources', () => {

    before(async() => {
      await createDbTables()
      await createUser('newuser@gmail.com', 'password')
      token = await loginGetToken('newuser@gmail.com', 'password')
    })
    
    after(async () => {
        await removeDbTables()
    })

    describe('create facility for resources tests', () => {
      it('should respond with a 201 status code when creating new facility', done => {
        request(app)
          .post('/api/facilities')
          .send({name: 'Test Club', description: 'A great place'})
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201, done);
      })
    })

  describe('GET /api/resources/by_facility/{id}', () => {

    it('should respond with JSON and a 200 status code for a valid facility id', done => {
      request(app)
        .get('/api/resources/by_facility/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    })

    it('should respond with a 422 status code for an invalid facility id', done => {
      request(app)
        .get('/api/resources/by_facility/999')
        .expect(422, done);
    })

    it('should respond with a 422 status code for a non-integer id', done => {
      request(app)
        .get('/api/resources/by_facility/test')
        .expect(422, done);
    })
  })

  describe('POST /api/resources/by_facility/{id}', () => {

    it('should respond with a 201 status code when creating new resource', done => {
      request(app)
        .post('/api/resources/by_facility/1')
        .send({name: 'Test Court 1', description: 'Test'})
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done);
    })

    it('should respond with a 422 status code for missing resource info in request body', done => {
      request(app)
        .post('/api/resources/by_facility/1')
        .send({})
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422, done);
    })
  })

  describe('DELETE /api/resources/by_facility/{facilityId}/{resourceId}', () => {

    it('should respond with a 204 status code when deleting a resource', done => {
      request(app)
      .delete('/api/resources/by_facility/1/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(204, done)
    })

    it('should respond with a 422 status code when trying to delete a non-integer resource', done => {
      request(app)
      .delete('/api/resources/by_facility/1/test')
      .set('Authorization', `Bearer ${token}`)
      .expect(422, done)
    })
  })
})
