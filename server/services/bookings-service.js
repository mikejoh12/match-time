const { fetchBookingsByFacilityDb,
        fetchBookingsByUserDb,
        checkConflictBookingDb,
        createBookingDb,
        removeBookingDb,
        fetchBookingByIdDb
    } = require('../db/bookings-db.js')

const fetchBookingsByFacility = async id => await fetchBookingsByFacilityDb(id)

const fetchBookingsByUser = async id => await fetchBookingsByUserDb(id)

const fetchBookingById = async id => await fetchBookingByIdDb(id)

const checkConflictBooking = async booking => await checkConflictBookingDb(booking)

const createBooking = async booking => await createBookingDb(booking)

const removeBooking = async bookingId => await removeBookingDb(bookingId)

module.exports = {  fetchBookingsByFacility,
                    fetchBookingsByUser,
                    checkConflictBooking,
                    createBooking,
                    removeBooking,
                    fetchBookingById
                }