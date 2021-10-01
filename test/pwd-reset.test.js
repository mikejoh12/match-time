const request = require('supertest')
const app = require('../app')
const db = require('../config/db.js')
const { addHours } = require('date-fns');
const { createDbTables, removeDbTables, createUser } = require('./test-utils')

describe('password reset', () => {
  
  beforeEach(async() => {
    await createDbTables()
    await createUser('testuser@gmail.com', 'password')

    let expireDate = addHours(new Date(), 1);
    const res = await db.query(
      `INSERT INTO reset_tokens
       (email, token, expiration, created_at, updated_at, used)
       VALUES ('testuser@gmail.com', 'test-token', $1, now(), now(), 0) RETURNING *;`
       , [expireDate])
  })

  afterEach(async () => {
    await removeDbTables()
  })

  describe('/api/auth/password_forgot', () => {

    it('should respond with a 200 status code for a valid user', (done) => {
      request(app)
        .post('/api/auth/password_forgot')
        .send({email: 'testuser@gmail.com'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    })

    it('should respond with a 200 status code for a non-valid email/user', (done) => {
        request(app)
          .post('/api/auth/password_forgot')
          .send({email: 'not_a_user@gmail.com'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
      })
  })
  
  describe('/api/auth/password_reset', () => {

    it('should respond with a 200 code when giben a valid reset token, email and new password', (done) => {
      request(app)
        .post('/api/auth/password_reset')
        .send({email: 'testuser@gmail.com', token: 'test-token', password: 'newpassword'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    })

    it('should respond with a 401 code when given an invalid reset token', (done) => {
      request(app)
        .post('/api/auth/password_reset')
        .send({email: 'testuser@gmail.com', token: 'wrong-token', password: 'newpassword'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401, done);
    })

    it('should respond with a 401 code when given an invalid email', (done) => {
      request(app)
        .post('/api/auth/password_reset')
        .send({email: 'wrong-email@gmail.com', token: 'test-token', password: 'newpassword'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401, done);
    })
  })
})
