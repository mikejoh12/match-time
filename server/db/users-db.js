const { pool } = require('../config/config.js')

const fetchUserByEmailDb = async (email) => {
    const res = await pool.query(`SELECT id, email, date_joined, pwd_hash, user_role, active
                                  FROM users WHERE email = $1`, [email])
    return res.rows[0]
}

const createUserDb = async ({email, pwd_hash, user_role}) => {
    const text = `INSERT INTO users(email, pwd_hash, user_role)
                  VALUES($1, $2, $3) RETURNING *`
    const values = [email, pwd_hash, user_role]
    const res = await pool.query(text, values)
    return res.rows[0]
}

module.exports = { fetchUserByEmailDb, createUserDb }