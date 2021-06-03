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

module.exports = { fetchBookingsByFacilityDb }