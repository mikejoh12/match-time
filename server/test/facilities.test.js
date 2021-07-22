const request = require('supertest')
const app = require('../app')
const { pool } = require('../config/config.js')

describe('/api/facilities', () => {
  
  // Delete functionality requires facilities, resources, and bookings tables to be created
  beforeEach(async() => {
    await pool.query(
      `CREATE TABLE "facilities" (
      "id" SERIAL PRIMARY KEY,
      "name" varchar(100) NOT NULL,
      "description" varchar(1000))`
    )
    await pool.query(
      `CREATE TABLE "resources" (
        "id" SERIAL PRIMARY KEY,
        "facilities_id" int,
        "name" varchar(100),
        "description" varchar(100)
      );`
    )
    await pool.query(
      `CREATE TABLE "bookings" (
        "id" SERIAL PRIMARY KEY,
        "resources_id" int NOT NULL,
        "organizer_id" int NOT NULL,
        "start_time" timestamptz NOT NULL,
        "end_time" timestamptz NOT NULL
      );`
  )
  await pool.query(
    `CREATE TABLE "users" (
      "id" SERIAL PRIMARY KEY,
      "email" varchar(100) UNIQUE NOT NULL,
      "pwd_hash" varchar(100),
      "date_joined" timestamp DEFAULT (now()),
      "active" boolean DEFAULT true,
      "user_role" varchar(100)
    );`)
    await pool.query(
      `INSERT INTO facilities (name, description) VALUES ('Smash Tennis Club', 'A private tennis club with well maintened indoor courts, hard courts, clay courts, and padel courts.')`
    )
    await pool.query(
      `INSERT INTO resources (facilities_id, name, description) VALUES (1, 'Test Court 1', 'Nice test court')`
    )
    await pool.query(
      `INSERT INTO users(email, pwd_hash, user_role) VALUES ('test@testmail.com', 'test-hash', 'customer')`
  )
  })

  afterEach(async () => {
    await pool.query(`DROP TABLE facilities`)
    await pool.query(`DROP TABLE resources`)
    await pool.query(`DROP TABLE bookings`)
    await pool.query(`DROP TABLE users`)
  })

  describe('GET /api/facilities/by_user/{id}', () => {

    it('should respond with JSON and a 200 status code', done => {
      request(app)
        .get('/api/facilities/1')
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

  describe('DELETE /api/facilities/{id}', () => {

    it('should respond with a 204 status code when deleting a facility', done => {
      request(app)
      .delete('/api/facilities/1')
      .expect(204, done)
    })

    it('should respond with a 422 status code when trying to delete a non-integer facility', done => {
      request(app)
      .delete('/api/facilities/test')
      .expect(422, done)
    })
  })
})
