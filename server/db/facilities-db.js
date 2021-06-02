const { pool } = require('../config/config.js')

const fetchFacilityInfoDb = async (id) => {
    const res = await pool.query(
        `SELECT * FROM facilities WHERE id = $1`, [id]
    )
    return res.rows[0]
}

module.exports = { fetchFacilityInfoDb }