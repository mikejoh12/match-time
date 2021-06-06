const { fetchFacilityInfo } = require('../services/facilities-service.js')
const { fetchBookingsByFacility, createBooking, removeBooking, fetchBookingById } = require('../services/bookings-service.js')

const getBookings = async (req, res) => {
    const { id } = req.params
    const facilityInfo = await fetchFacilityInfo(id)
    if (!facilityInfo) {
        return res.status(422).json({error: "Invalid facility id."})
    }

    const bookings = await fetchBookingsByFacility(id)
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
    const newBooking = await createBooking(booking)
    res.status(201).json({booking_id: newBooking.id})
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

module.exports = { getBookings, postBooking, deleteBooking }