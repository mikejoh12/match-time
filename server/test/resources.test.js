const request = require('supertest')
const app = require('../app')
const { pool } = require('../config/config.js')

describe('/api/resources', () => {

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
        await pool.query(
            `CREATE TABLE "resources" (
                "id" SERIAL PRIMARY KEY,
                "facilities_id" int,
                "name" varchar(100),
                "description" varchar(100)
            );`
        )
        await pool.query(
        `INSERT INTO resources (facilities_id, name, description) VALUES (1, 'Court 1', 'Indoor hard-court')`)
    })

    afterEach(async () => {
        await pool.query(`DROP TABLE resources`)
        await pool.query(`DROP TABLE facilities`)
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

  describe('POST /api/resources', () => {

    it('should respond with a 201 status code when creating new resource', done => {
      request(app)
        .post('/api/resources')
        .send({facilities_id: 1, name: 'Test Court 1', description: 'Test'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done);
    })

    it('should respond with a 422 status code for missing resource info in request body', done => {
      request(app)
        .post('/api/resources')
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422, done);
    })
  })
})
