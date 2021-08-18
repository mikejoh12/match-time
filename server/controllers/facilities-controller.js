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
        return res.status(422).json({error: "Invalid facility id."})
    }
    res.status(200).json(facilityInfo)
}

const postFacility = async (req, res) => {
    const { id: userId } = req.user
    const { name, description } = req.body
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