const { fetchFacilities, fetchFacilityInfo, createFacility } = require('../services/facilities-service.js')

const getFacilites = async (req, res) => {
    const facilities = await fetchFacilities()
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

module.exports = { getFacilites, getFacilityInfo, postFacility }