const db = require('../config/db.js')

const fetchFacilitiesByUserDb = async (id) => {
    const res = await db.query(
        `SELECT * FROM facilities
        INNER JOIN users_facilities ON facilities.id = users_facilities.facilities_id
        WHERE users_id = $1`, [id]
    )
    return res.rows
}

const fetchFacilityInfoDb = async (id) => {
    const res = await db.query(
        `SELECT * FROM facilities WHERE id = $1`, [id]
    )
    return res.rows[0]
}

const createFacilityDb = async ({name, description}) => {
    const text = `INSERT INTO facilities(name, description)
                  VALUES($1, $2) RETURNING *`
    const values = [name, description]
    const res = await db.query(text, values)
    return res.rows[0]
}

const removeFacilityDb = async (id) => {
    const res = await db.query(
        `DELETE FROM facilities WHERE id = $1`, [id]
    )
    return res.rows
}

const fetchFacilitiesManagingByUserDb = async (id) => {
    const res = await db.query(
        `SELECT * FROM facilities
        INNER JOIN users_facilities ON facilities.id = users_facilities.facilities_id
        WHERE users_id = $1 AND is_admin = true`, [id]
    )
    return res.rows
}

module.exports = {  fetchFacilitiesByUserDb,
                    fetchFacilityInfoDb,
                    createFacilityDb,
                    removeFacilityDb,
                    fetchFacilitiesManagingByUserDb
                }