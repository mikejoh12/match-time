const { fetchBookingsByFacilityDb, createBookingDb } = require('../db/bookings-db.js')

const fetchBookingsByFacility = async id => {
    return await fetchBookingsByFacilityDb(id)
}

const createBooking = async booking => {
    return await createBookingDb(booking)
}

module.exports = { fetchBookingsByFacility, createBooking }