const { fetchFacilityInfo } = require('../services/facilities-service.js')

const getFacilityInfo = async (req, res) => {
    const { id } = req.params
    const facilityInfo = await fetchFacilityInfo(id);
    res.status(200).json(facilityInfo);
}

module.exports = { getFacilityInfo }