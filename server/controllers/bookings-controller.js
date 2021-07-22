const { fetchFacilityInfo } = require('../services/facilities-service.js')
const { fetchBookingsByFacility, fetchBookingsByUser, checkConflictBooking, createBooking, removeBooking, fetchBookingById } = require('../services/bookings-service.js')

const getBookingsByFacility = async (req, res) => {
    const { id } = req.params
    const facilityInfo = await fetchFacilityInfo(id)
    if (!facilityInfo) {
        return res.status(422).json({error: "Invalid facility id."})
    }

    const bookings = await fetchBookingsByFacility(id)
    res.status(200).json(bookings)
}

const getBookingsByUser = async (req, res) => {
    const { id } = req.user
    const bookings = await fetchBookingsByUser(id)
    res.status(200).json(bookings)
}

const postBooking = async (req, res, next) => {
    const { resources_id, organizer_id, start_time, end_time } = req.body
    const booking = {
        resources_id,
        organizer_id,
        start_time,
        end_time
    }
    // TODO For now checks for other bookings on same resource. Update to check time conflict.
    const conflictBookings = await checkConflictBooking(booking)
    if (conflictBookings.length) {
        return res.status(409).json({error: "Conflict with other booking/bookings on same resource."})
    }
    const newBooking = await createBooking(booking)
    res.status(201).json(newBooking)
}

const deleteBooking = async (req, res) => {
    const { id } = req.params
    const booking = await fetchBookingById(id)
    if (!booking) {
        return res.status(422).json({error: "Invalid booking id."})
    }
    await removeBooking(id)
    res.status(204).send()
}

module.exports = { getBookingsByFacility, getBookingsByUser, postBooking, deleteBooking }