const request = require('supertest')
const app = require('../app')
const { pool } = require('../config/config.js')

describe('/api/facilities', () => {
  
  beforeEach(async() => {
    await pool.query(
      `CREATE TABLE "facilities" (
      "id" SERIAL PRIMARY KEY,
      "name" varchar(100) NOT NULL,
      "description" varchar(1000))`
    )
    await pool.query(
      `INSERT INTO facilities (name, description) VALUES ('Smash Tennis Club', 'A private tennis club with well maintened indoor courts, hard courts, clay courts, and padel courts.')`
    )
  })

  afterEach(async () => {
    await pool.query(`DROP TABLE facilities`)
  })
  
  describe('GET /api/facilities', () => {

    it('should respond with JSON and a 200 status code', done => {
      request(app)
        .get('/api/facilities')
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

  describe('POST /api/facilities', () => {

    it('should respond with a 201 status code when creating new facility', done => {
      request(app)
        .post('/api/facilities')
        .send({name: 'Test Club', description: 'A great place'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done);
    })

    it('should respond with a 422 status code for missing facility info in request body', done => {
      request(app)
        .post('/api/facilities')
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422, done);
    })
  })
})
