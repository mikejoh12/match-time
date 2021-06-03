const { fetchFacilityInfo } = require('../services/facilities-service.js')
const { fetchBookingsByFacility } = require('../services/bookings-service.js')

const getBookings = async (req, res) => {
    const { id } = req.params
    const facilityInfo = await fetchFacilityInfo(id)
    if (!facilityInfo) {
        return res.status(404).json({error: "Invalid facility id."})
    }

    const bookings = await fetchBookingsByFacility(id)
    res.status(200).json(bookings)
}

module.exports = { getBookings }