const { fetchBookingsByFacilityDb } = require('../db/bookings-db.js')

const fetchBookingsByFacility = async id => {
    return await fetchBookingsByFacilityDb(id)
}

module.exports = { fetchBookingsByFacility }