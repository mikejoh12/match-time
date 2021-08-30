const request = require('supertest')
const app = require('../app')
const { createDbTables, removeDbTables } = require('./test-utils')

describe('/api/auth/signup', () => {
  
  before(async() => {
    await createDbTables()
  })

  after(async () => {
    await removeDbTables()
  })

  describe('create a user', () => {
    it('should respond with a 201 status code when creating new user', (done) => {
      request(app)
        .post('/api/auth/signup')
        .send({email: 'newuser@gmail.com', firstName: 'first', lastName: 'last', password: 'password'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done);
    })
  })

  describe('login', () => {
    it('should login and receive a token with correct credentials',(done) => {
      const res = request(app)
        .post('/api/auth/login')
        .send({email: 'newuser@gmail.com', password: 'password'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    })
  })

  describe('user validation - duplicate email', () => {
    it('should respond with a 422 status code for an already taken email', done => {
      request(app)
        .post('/api/auth/signup')
        .send({email: 'newuser@gmail.com', firstName: 'first', lastName: 'last', password: 'test-password'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422, done);
    })
  })

  describe('user-validation - incorrect format', () => {
    it('should respond with a 422 status code for incorrect email format', done => {
      request(app)
        .post('/api/auth/signup')
        .send({email: 'not_an_email_address', firstName: 'first', lastName: 'last', password: 'test-password'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422, done);
    })
  })
})
