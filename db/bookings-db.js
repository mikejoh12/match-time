const db = require('../config/db.js')

const fetchBookingsByFacilityDb = async id => {
    const res = await db.query(
        `SELECT bookings.id AS bookings_id, resources_id, organizer_id, start_time, end_time,
         facilities_id, resources.name AS resources_name, first_name, last_name
         FROM bookings
         INNER JOIN resources ON bookings.resources_id = resources.id
         INNER JOIN facilities ON resources.facilities_id = facilities.id
         INNER JOIN users ON organizer_id = users.id
         WHERE facilities.id = $1`, [id])
    return res.rows
}

const fetchBookingsByUserDb = async id => {
    const res = await db.query(
        `SELECT bookings.id AS bookings_id, resources_id, organizer_id, start_time, end_time,
         facilities_id, resources.name AS resources_name
         FROM bookings
         INNER JOIN resources ON bookings.resources_id = resources.id
         INNER JOIN facilities ON resources.facilities_id = facilities.id
         WHERE organizer_id = $1`, [id])
    return res.rows
}

// Check 3 cases of conflicts:
// 1. Booking starts before scheduled booking and ends after
// 2. Start of booking is within time of existing booking
// 3. End of booking is within time of existing booking
const checkConflictBookingDb = async ({ resourceId, startTime, endTime }) => {
    const text =    `SELECT * FROM bookings
                    WHERE resources_id = $1 AND (
                    ($2 < start_time AND $3 > end_time) OR
                    ($2 >= start_time AND $2 < end_time) OR
                    ($3 > start_time AND $3 <= end_time)
                    )` 
    const values = [resourceId, startTime, endTime]
    const res = await db.query(text, values)
    return res.rows
}

const createBookingDb = async ({resourceId, organizerId, startTime, endTime}) => {
    const text = `INSERT INTO bookings(resources_id, organizer_id, start_time, end_time)
                  VALUES($1, $2, $3, $4) RETURNING *`
    const values = [resourceId, organizerId, startTime, endTime]
    const res = await db.query(text, values)
    return res.rows[0]
}

const removeBookingDb = async bookingId => {
    const res = await db.query('DELETE FROM bookings WHERE id = $1', [bookingId])
    return res.rows
}

const removeBookingsByResourceIdDb = async id => {
    const res = await db.query('DELETE FROM bookings WHERE resources_id = $1', [id])
    return res.rows
}

const fetchBookingByIdDb = async id => {
    const res = await db.query('SELECT * FROM bookings WHERE id = $1', [id])
    return res.rows[0]
}

module.exports = { fetchBookingsByFacilityDb, fetchBookingsByUserDb, checkConflictBookingDb, createBookingDb, removeBookingDb, removeBookingsByResourceIdDb, fetchBookingByIdDb }