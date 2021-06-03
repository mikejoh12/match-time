const { fetchFacilityInfo } = require('../services/facilities-service.js')

const getFacilityInfo = async (req, res) => {
    const { id } = req.params
    const facilityInfo = await fetchFacilityInfo(id);
    if (!facilityInfo) {
        res.status(404).json({error: "Invalid facility id."})
    } else {
        res.status(200).json(facilityInfo)
    }
}

module.exports = { getFacilityInfo }