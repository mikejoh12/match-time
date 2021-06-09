const { pool } = require('../config/config.js')

const fetchFacilitiesDb = async () => {
    const res = await pool.query(
        `SELECT * FROM facilities`
    )
    return res.rows
}

const fetchFacilityInfoDb = async (id) => {
    const res = await pool.query(
        `SELECT * FROM facilities WHERE id = $1`, [id]
    )
    return res.rows[0]
}

const createFacilityDb = async ({name, description}) => {
    const text = `INSERT INTO facilities(name, description)
                  VALUES($1, $2) RETURNING *`
    const values = [name, description]
    const res = await pool.query(text, values)
    return res.rows[0]
}

module.exports = {  fetchFacilitiesDb,
                    fetchFacilityInfoDb,
                    createFacilityDb }