const { fetchBookingsByFacilityDb,
        createBookingDb,
        removeBookingDb,
        fetchBookingByIdDb
    } = require('../db/bookings-db.js')

const fetchBookingsByFacility = async id => await fetchBookingsByFacilityDb(id)

const fetchBookingById = async id => await fetchBookingByIdDb(id)

const createBooking = async booking => await createBookingDb(booking)

const removeBooking = async id => await removeBookingDb(id)

module.exports = {  fetchBookingsByFacility,
                    createBooking,
                    removeBooking,
                    fetchBookingById
                }