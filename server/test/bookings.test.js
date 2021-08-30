const request = require('supertest')
const app = require('../app')
const { pool } = require('../config/config.js')
let token = null;

describe('/api/bookings', () => {

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

  beforeEach(async() => {
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

  afterEach(async () => {
    await pool.query(`DROP TABLE facilities`)
    await pool.query(`DROP TABLE bookings`)
    await pool.query(`DROP TABLE resources`)
  })

  describe('create a user to access bookings', async () => {
    it('should respond with a 201 status code when creating new user', async() => {
      await request(app)
        .post('/api/auth/signup')
        .send({email: 'newuser@gmail.com', firstName: 'first', lastName: 'last', password: 'password'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
    })
  })

  describe('login', () => {
    it('login user to access bookings', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({email: 'newuser@gmail.com', password: 'password'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      token = res.body.token
    })
  })

  describe('GET /api/bookings/by_facility/{id}', () => {
    it('should respond with JSON and a 200 status code for a valid facility id', done => {
      request(app)
        .get('/api/bookings/by_facility/1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200, done);
    })

    it('should respond with a 422 status code for an invalid facility id', done => {
      request(app)
        .get('/api/bookings/by_facility/999')
        .set('Authorization', `Bearer ${token}`)
        .expect(422, done);
    })

    it('should respond with a 422 status code for a non-integer facility id', done => {
      request(app)
        .get('/api/bookings/by_facility/wrong_id')
        .set('Authorization', `Bearer ${token}`)
        .expect(422, done);
    })
  })

  describe('GET /api/bookings/by_user', () => {
    it('should respond with JSON and a 200 status code for a valid user id', done => {
      request(app)
        .get('/api/bookings/by_user')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200, done);
    })

  })

  describe('POST /api/bookings', () => {
    it('should respond with a 201 status code when creating a new booking', done => {
      request(app)
        .post('/api/bookings')
        .send({resourceId: 1, organizerId: 1, startTime: '2021-06-02T20:00:00.000Z', endTime: '2021-06-02T22:00:00.000Z'})
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(201, done)
    })

    it('should respond with a 422 status code when creating booking without required req-body data', done => {
      request(app)
        .post('/api/bookings')
        .send({test_data: "test"})
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(422, done);
    })
  })

  describe('DELETE /api/bookings/{id}', () => {
    it('should respond with a 204 status code when deleting booking', done => {
      request(app)
        .delete(`/api/bookings/1`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204, done);
    })
  })

  describe('DELETE /api/bookings/{id}', () => {
    it('should respond with 422 status code when given an invalid booking id', done => {
      request(app)
        .delete(`/api/bookings/999`)
        .set('Authorization', `Bearer ${token}`)
        .expect(422, done);
    })
  })
})