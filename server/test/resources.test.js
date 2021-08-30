const request = require('supertest')
const app = require('../app')
const { pool } = require('../config/config.js')
let token = null;

describe('/api/resources', () => {

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
        `CREATE TABLE "users_facilities" (
          "users_id" int,
          "facilities_id" int,
          "is_admin" boolean NOT NULL
        );`
      )
    })
    

    after(async () => {
        await pool.query(`DROP TABLE users`)
        await pool.query(`DROP TABLE invitations`)
        await pool.query(`DROP TABLE resources`)
        await pool.query(`DROP TABLE facilities`)
        await pool.query(`DROP TABLE bookings`)
        await pool.query(`DROP TABLE users_facilities`)
    })

    describe('create a user to access resources', () => {
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
      it('login user to access resources', async() => {
        const res = await request(app)
          .post('/api/auth/login')
          .send({email: 'newuser@gmail.com', password: 'password'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);
        token = res.body.token
      })
    })

    describe('create facility for resources tests', () => {
      it('should respond with a 201 status code when creating new facility', done => {
        request(app)
          .post('/api/facilities')
          .send({name: 'Test Club', description: 'A great place'})
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201, done);
      })
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

  describe('POST /api/resources/by_facility/{id}', () => {

    it('should respond with a 201 status code when creating new resource', done => {
      request(app)
        .post('/api/resources/by_facility/1')
        .send({name: 'Test Court 1', description: 'Test'})
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done);
    })

    it('should respond with a 422 status code for missing resource info in request body', done => {
      request(app)
        .post('/api/resources/by_facility/1')
        .send({})
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422, done);
    })
  })

  describe('DELETE /api/resources/by_facility/{facilityId}/{resourceId}', () => {

    it('should respond with a 204 status code when deleting a resource', done => {
      request(app)
      .delete('/api/resources/by_facility/1/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(204, done)
    })

    it('should respond with a 422 status code when trying to delete a non-integer resource', done => {
      request(app)
      .delete('/api/resources/by_facility/1/test')
      .set('Authorization', `Bearer ${token}`)
      .expect(422, done)
    })
  })
})
