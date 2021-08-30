const { pool } = require('../config/config.js')

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
}

const removeDbTables = async() => {
    await pool.query(`DROP TABLE users`)
    await pool.query(`DROP TABLE invitations`)
    await pool.query(`DROP TABLE facilities`)
    await pool.query(`DROP TABLE resources`)
    await pool.query(`DROP TABLE bookings`)
    await pool.query(`DROP TABLE users_facilities`)
}

module.exports = {
    createDbTables,
    removeDbTables
}