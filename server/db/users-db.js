const { pool } = require('../config/config.js')

const fetchUserByEmailDb = async (email) => {
    const res = await pool.query(`SELECT id, email, first_name, last_name, date_joined, pwd_hash, user_role, active
                                  FROM users WHERE email = $1`, [email])
    return res.rows[0]
}

const fetchUserByIdDb = async id => {
    const res = await pool.query(`SELECT id, email, date_joined, user_role, active
                                  FROM users WHERE id = $1`, [id])
    return res.rows[0]
}

const createUserDb = async ({email, first_name, last_name, pwd_hash, user_role}) => {
    const text = `INSERT INTO users(email, first_name, last_name, pwd_hash, user_role)
                  VALUES($1, $2, $3, $4, $5) RETURNING *`
    const values = [email, first_name, last_name, pwd_hash, user_role]
    const res = await pool.query(text, values)
    return res.rows[0]
}

const createFacilityManagerDb = async ({facilityId, userId}) => {
    const text = `INSERT INTO users_facilities(users_id, facilities_id, is_admin)
                  VALUES($1, $2, true)`
    const values = [userId, facilityId]
    const res = await pool.query(text, values)
    return res.rows[0]
}

module.exports = { fetchUserByEmailDb, fetchUserByIdDb, createUserDb, createFacilityManagerDb }