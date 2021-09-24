const { fetchFacilityInfo } = require('../services/facilities-service.js')
const { fetchBookingsByFacility, fetchBookingsByUser, checkConflictBooking, createBooking, removeBooking, fetchBookingById } = require('../services/bookings-service.js')

const getBookingsByFacility = async (req, res) => {
    const { facilityId } = req.params
    const facilityInfo = await fetchFacilityInfo(facilityId)
    if (!facilityInfo) {
        return res.status(422).json({
            error: {status: 422, data: "Invalid facility id."}
        })
    }

    const bookings = await fetchBookingsByFacility(facilityId)
    res.status(200).json(bookings)
}

const getBookingsByUser = async (req, res) => {
    const { id } = req.user
    const bookings = await fetchBookingsByUser(id)
    res.status(200).json(bookings)
}

const postBooking = async (req, res, next) => {
    const { resourceId, organizerId, startTime, endTime } = req.body
    const booking = {
        resourceId,
        organizerId,
        startTime,
        endTime
    }
    const conflictBookings = await checkConflictBooking(booking)
    if (conflictBookings.length) {
        return res.status(409).json({
            error: {status: 409, data: "Conflict with other booking on the same resource."}
        })
    }
    const newBooking = await createBooking(booking)
    res.status(201).json(newBooking)
}

const deleteBooking = async (req, res) => {
    const { bookingId } = req.params
    const booking = await fetchBookingById(bookingId)
    if (!booking) {
        return res.status(422).json({
            error: { status: 422, data: "Invalid booking id." }
        })
    }
    await removeBooking(bookingId)
    res.status(204).send()
}

module.exports = { getBookingsByFacility, getBookingsByUser, postBooking, deleteBooking }