const request = require('supertest')
const app = require('../app')
const { pool } = require('../config/config.js')

describe('/api/auth/signup', () => {
  
  before(async() => {
    await pool.query(
      `CREATE TABLE "users" (
        "id" SERIAL PRIMARY KEY,
        "email" varchar(100) UNIQUE NOT NULL,
        "first_name" varchar(100) NOT NULL,
        "last_name" varchar(100) NOT NULL,
        "pwd_hash" varchar(100),
        "date_joined" timestamp DEFAULT (now()),
        "active" boolean DEFAULT FALSE,
        "user_role" varchar(100)
      );`
    )
    await pool.query(`
    CREATE TABLE "invitations" (
      "email" varchar(100) NOT NULL,
      "facilities_id" int,
      PRIMARY KEY("email", "facilities_id")
      )`
    )
  })

  after(async () => {
    await pool.query(`DROP TABLE users`)
    await pool.query(`DROP TABLE invitations`)
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
