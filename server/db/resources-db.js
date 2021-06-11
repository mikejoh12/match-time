const { pool } = require('../config/config.js')

const fetchResourcesDb = async (id) => {
    const res = await pool.query(
        `SELECT * FROM resources WHERE facilities_id = $1`, [id]
    )
    return res.rows
}

module.exports = {
    fetchResourcesDb
 }