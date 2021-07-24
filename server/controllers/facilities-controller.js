const { fetchFacilitiesByUser, fetchFacilityInfo, createFacility, removeFacility } = require('../services/facilities-service.js')
const { fetchManagerById } = require('../services/users-service.js')

const getFacilitesByUser = async (req, res) => {
    const { id } = req.user
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
    const { id: facilityId } = req.params
    const { id: userId } = req.user
    console.log(`User id: ${userId} Facility id: ${facilityId}`)
    const facilityManager = await fetchManagerById(facilityId, userId)
    console.log(`facilityManager: ${JSON.stringify(facilityManager)}`)
    // If user is not manager of facility - don't allow access
    if (!facilityManager) {
        console.log('rejecting access')
        return res.status(401).json({error: "No manager access."})
    }
    await removeFacility(facilityId)
    res.status(204).send()
}

module.exports = { getFacilitesByUser, getFacilityInfo, postFacility, deleteFacility }