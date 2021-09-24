const { pool } = require('../config/config.js')

const fetchResourcesDb = async id => {
    const res = await pool.query(
        `SELECT * FROM resources WHERE facilities_id = $1 ORDER BY name`, [id]
    )
    return res.rows
}

const createResourceDb = async ({facilityId, name, description}) => {
    const text = `INSERT INTO resources(facilities_id, name, description)
                  VALUES($1, $2, $3) RETURNING *`
    const values = [facilityId, name, description]
    const res = await pool.query(text, values)
    return res.rows[0]
}

const deleteResourceDb = async id => {
    const res = await pool.query(
        `DELETE FROM resources WHERE id = $1`, [id]
    )
    return res.rows
}

const resourceBelongsToFacilityDb = async ({ facilityId, resourceId} ) => {
    const res = await pool.query(
        `SELECT * FROM resources WHERE facilities_id = $1 AND id = $2`, [facilityId, resourceId]
    )
    return res.rows[0]
}

module.exports = {
    fetchResourcesDb,
    createResourceDb,
    deleteResourceDb,
    resourceBelongsToFacilityDb
 }