const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'
const database = process.env.NODE_ENV === 'test' ? process.env.DB_DATABASE_TEST : process.env.DB_DATABASE
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${database}`

const pool = new Pool({
        connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
        ssl: {
          rejectUnauthorized: false
        }
  })

module.exports = {
    query: (text, params) => pool.query(text, params),
}