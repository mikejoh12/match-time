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

const createUserDb = async ({email, firstName, lastName, pwdHash, userRole, active}) => {
    const text = `INSERT INTO users(email, first_name, last_name, pwd_hash, user_role, active)
                  VALUES($1, $2, $3, $4, $5, $6) RETURNING *`
    const values = [email, firstName, lastName, pwdHash, userRole, active]
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

const fetchManagerByIdDb = async (facilityId, userId) => {
    const res = await pool.query(   `SELECT id, facilities_id, is_admin FROM users
                                    INNER JOIN users_facilities ON users.id = users_facilities.users_id
                                    WHERE users_facilities.facilities_id = $1
                                    AND users.id = $2
                                    AND users_facilities.is_admin = true`, [facilityId, userId])
    return res.rows[0]
}

const removeFacilityManagerDb = async facilityId => {
    const res = await pool.query(
        `DELETE FROM users_facilities WHERE facilities_id = $1`, [facilityId]
    )
    return res.rows
}

const createFacilityMemberDb = async ({facilityId, userId}) => {
    const text = `INSERT INTO users_facilities(users_id, facilities_id, is_admin)
                  VALUES($1, $2, false)`
    const values = [userId, facilityId]
    const res = await pool.query(text, values)
    return res.rows[0]
}

const fetchMembersByFacilityIdDb = async facilityId => {
    const res = await pool.query(`SELECT id, email, first_name, last_name, active
                                  FROM users 
                                  INNER JOIN users_facilities ON users.id = users_facilities.users_id
                                  WHERE facilities_id = $1`, [facilityId])
    return res.rows
}

module.exports = {  fetchUserByEmailDb,
                    fetchUserByIdDb,
                    createUserDb,
                    createFacilityManagerDb,
                    fetchManagerByIdDb,
                    removeFacilityManagerDb,
                    createFacilityMemberDb,
                    fetchMembersByFacilityIdDb }