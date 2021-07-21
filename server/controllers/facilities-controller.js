const { fetchFacilitiesByUser, fetchFacilityInfo, createFacility, removeFacility } = require('../services/facilities-service.js')

const getFacilitesByUser = async (req, res) => {
    const { id } = req.params
    const facilities = await fetchFacilitiesByUser(id)
    res.status(200).json(facilities)
}

const getFacilityInfo = async (req, res) => {
    const { id } = req.params
    const facilityInfo = await fetchFacilityInfo(id);
    if (!facilityInfo) {
        return res.status(422).json({error: "Invalid facility id."})
    }
    res.status(200).json(facilityInfo)
}

const postFacility = async (req, res) => {
    const { name, description } = req.body
    const facility = {
        name,
        description
    }
    const newFacility = await createFacility(facility)
    res.status(201).json(newFacility)
}

const deleteFacility = async (req, res) => {
    const { id } = req.params
    await removeFacility(id)
    res.status(204).send()
}

module.exports = { getFacilitesByUser, getFacilityInfo, postFacility, deleteFacility }