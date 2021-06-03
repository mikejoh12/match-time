const request = require('supertest')
const app = require('../app')
const { pool } = require('../config/config.js')

describe('GET /api/facilities/{id}', () => {
  before(async() => {
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

  after(async () => {
    await pool.query(`DROP TABLE facilities`)
  })

  it('should respond with JSON and a 200 status code for a valid facility id', done => {
    request(app)
      .get('/api/facilities/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })

  it('should respond with a 404 status code for an invalid facility id', done => {
    request(app)
      .get('/api/facilities/999')
      .expect(404, done);
  })
})
