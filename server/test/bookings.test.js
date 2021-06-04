const request = require('supertest')
const app = require('../app')
const { pool } = require('../config/config.js')

describe('GET /api/bookings/by_facility/{id}', () => {
  before(async() => {
    await pool.query(
        `CREATE TABLE "facilities" (
            "id" SERIAL PRIMARY KEY,
            "name" varchar(100) NOT NULL,
            "description" varchar(1000)
            )`)
    await pool.query(
        `CREATE TABLE "bookings" (
            "id" SERIAL PRIMARY KEY,
            "resources_id" int,
            "organizer_id" int,
            "start_time" timestamp,
            "end_time" timestamp
            );`)
    await pool.query(
        `CREATE TABLE "resources" (
            "id" SERIAL PRIMARY KEY,
            "facilities_id" int,
            "name" varchar(100),
            "description" varchar(100)
            );`)
    await pool.query(
        `INSERT INTO facilities (name, description) VALUES ('Smash Tennis Club', 'A private tennis club with well maintened indoor courts, hard courts, clay courts, and padel courts.')`
    )
    await pool.query(
        `INSERT INTO bookings (resources_id, organizer_id, start_time, end_time) VALUES (1, 1, '2021-06-02T10:00:00.000Z', '2021-06-02T11:00:00.000Z');`
    )
  })

  after(async () => {
    await pool.query(`DROP TABLE facilities`)
    await pool.query(`DROP TABLE bookings`)
    await pool.query(`DROP TABLE resources`)
  })

  it('should respond with JSON and a 200 status code for a valid facility id', done => {
    request(app)
      .get('/api/bookings/by_facility/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })

  it('should respond with a 404 status code for an invalid facility id', done => {
    request(app)
      .get('/api/bookings/by_facility/999')
      .expect(404, done);
  })
})