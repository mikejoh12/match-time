const request = require('supertest')
const app = require('../app')
const { pool } = require('../config/config.js')

describe('/api/bookings', () => {
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

  describe('GET /api/bookings/by_facility/{id}', () => {
    it('should respond with JSON and a 200 status code for a valid facility id', done => {
      request(app)
        .get('/api/bookings/by_facility/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    })

    it('should respond with a 422 status code for an invalid facility id', done => {
      request(app)
        .get('/api/bookings/by_facility/999')
        .expect(422, done);
    })
  })

  describe('POST /api/bookings', () => {
    it('should respond with a 201 status code when creating a new booking', done => {
      request(app)
        .post('/api/bookings')
        .send({resources_id: 1, organizer_id: 1, start_time: '2021-06-02T20:00:00.000Z', end_time: '2021-06-02T22:00:00.000Z'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done);
    })
  })
})