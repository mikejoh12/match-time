const { fetchMembersByFacilityId } = require("../services/users-service");
const { fetchFacilityInfo } = require('../services/facilities-service')

const getUsersByFacility = async (req, res) => {
    const { facilityId } = req.params
    const facilityInfo = await fetchFacilityInfo(facilityId);
    if (!facilityInfo) {
        return res.status(422).json({error: "Invalid facility id."})
    }
    const users = await fetchMembersByFacilityId(facilityId)
    res.status(200).json(users)
}

module.exports = {
    getUsersByFacility
}