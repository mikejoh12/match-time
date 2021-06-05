const { pool } = require('../config/config.js')

const fetchBookingsByFacilityDb = async id => {
    const res = await pool.query(
        `SELECT bookings.id AS bookings_id, resources_id, start_time, end_time,
         facilities_id, resources.name AS resources_name
         FROM bookings
         INNER JOIN resources ON bookings.resources_id = resources.id
         INNER JOIN facilities ON resources.facilities_id = facilities.id
         WHERE facilities.id = $1`, [id])
    return res.rows
}

const createBookingDb = async ({resources_id, organizer_id, start_time, end_time}) => {
    const text = `INSERT INTO bookings(resources_id, organizer_id, start_time, end_time)
                  VALUES($1, $2, $3, $4) RETURNING *`
    const values = [resources_id, organizer_id, start_time, end_time]
    const res = await pool.query(text, values)
    return res.rows[0]
}

module.exports = { fetchBookingsByFacilityDb, createBookingDb }