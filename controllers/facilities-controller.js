const { fetchFacilitiesManagingByUserDb } = require('../db/facilities-db.js')
const { fetchFacilitiesByUser, fetchFacilityInfo, createFacility, removeFacility } = require('../services/facilities-service.js')

const getFacilitesByUser = async (req, res) => {
    const { id } = req.user
    const facilities = await fetchFacilitiesByUser(id)
    res.status(200).json(facilities)
}

const getFacilityInfo = async (req, res) => {
    const { facilityId } = req.params
    const facilityInfo = await fetchFacilityInfo(facilityId);
    if (!facilityInfo) {
        return res.status(422).json({
            error: { status: 422, data: "Invalid facility id." }
        })
    }
    res.status(200).json(facilityInfo)
}

const postFacility = async (req, res) => {
    const { id: userId } = req.user
    const { name, description } = req.body

    // Check if already managing 3 or more facilities
    const facilities = await fetchFacilitiesManagingByUserDb(userId)
    if (facilities.length >= 3) {
        return res.status(403).json({
            error: { status: 403, data: "Max number of facilities to manage is 3" }
        })
    }

    const facility = {
        name,
        description
    }
    const newFacility = await createFacility(facility, userId)
    res.status(201).json(newFacility)
}

const deleteFacility = async (req, res) => {
    const { facilityId } = req.params
    await removeFacility(facilityId)
    res.status(204).send()
}

module.exports = { getFacilitesByUser, getFacilityInfo, postFacility, deleteFacility }