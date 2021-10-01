const { pool } = require('../config/config.js')
const request = require('supertest')
const app = require('../app')

const createDbTables = async() => {
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
      await pool.query(
        `CREATE TABLE "reset_tokens" (
          "id" SERIAL PRIMARY KEY,
          "email" varchar(255) DEFAULT NULL,
          "token" varchar(255) DEFAULT NULL,
          "expiration" timestamptz DEFAULT NULL,
          "created_at" timestamptz NOT NULL,
          "updated_at" timestamptz NOT NULL,
          "used" int NOT NULL DEFAULT '0'
        )`
      )
      await pool.query(
        `CREATE TABLE "verify_email_tokens" (
          "id" SERIAL PRIMARY KEY,
          "email" varchar(255) UNIQUE DEFAULT NULL,
          "token" varchar(255) DEFAULT NULL,
          "expiration" timestamptz DEFAULT NULL,
          "created_at" timestamptz NOT NULL
        );`
      )
    }

const removeDbTables = async() => {
    await pool.query(`DROP TABLE users`)
    await pool.query(`DROP TABLE invitations`)
    await pool.query(`DROP TABLE facilities`)
    await pool.query(`DROP TABLE resources`)
    await pool.query(`DROP TABLE bookings`)
    await pool.query(`DROP TABLE users_facilities`)
    await pool.query(`DROP TABLE reset_tokens`)
    await pool.query(`DROP TABLE verify_email_tokens`)
}

const createUser = async(email, password) => {
    await request(app)
      .post('/api/auth/signup')
      .send({email, password, firstName: 'first', lastName: 'last'})
      .set('Accept', 'application/json')
    
    // Manually activate user through DB-call to simplify testing
    await pool.query(`UPDATE users SET active = true WHERE email='newuser@gmail.com'`)
}

const loginGetToken = async(email, password) => {
    const res = await request(app)
    .post('/api/auth/login')
    .send({email, password})
    return res.body.token
}

module.exports = {
    createDbTables,
    removeDbTables,
    createUser,
    loginGetToken
}