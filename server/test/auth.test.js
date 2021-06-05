const request = require('supertest')
const app = require('../app')
const { pool } = require('../config/config.js')

describe('/api/auth/signup', () => {
  
  before(async() => {
    await pool.query(
      `CREATE TABLE "users" (
        "id" SERIAL PRIMARY KEY,
        "email" varchar(100) UNIQUE NOT NULL,
        "pwd_hash" varchar(100),
        "date_joined" timestamp DEFAULT (now()),
        "active" boolean DEFAULT true,
        "user_role" varchar(100)
      );`
    )
    await pool.query(
      `INSERT INTO users(email, pwd_hash, user_role)
      VALUES('mikejoh12@gmail.com', 'testing-without-hash', 'customer')`
    )
  })

  after(async () => {
    await pool.query(`DROP TABLE users`)
  })

  it('should respond with a 201 status code when creating new user', done => {
    request(app)
      .post('/api/auth/signup')
      .send({email: 'test@gmail.com', password: 'test-password'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done);
  })

  it('should respond with a 403 status code for an already taken email', done => {
    request(app)
      .post('/api/auth/signup')
      .send({email: 'mikejoh12@gmail.com', password: 'test-password'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403, done);
  })
})
