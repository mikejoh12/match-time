const { fetchResources } = require("../services/resources-service")
const { fetchFacilityInfo } = require('../services/facilities-service')

const getResources = async (req, res) => {
    const { id } = req.params
    const facilityInfo = await fetchFacilityInfo(id);
    if (!facilityInfo) {
        return res.status(422).json({error: "Invalid facility id."})
    }
    const resources = await fetchResources(id)
    res.status(200).json(resources)
}

module.exports = {
    getResources
}