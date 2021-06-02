const { fetchFacilityInfoDb } = require('../db/facilities-db.js')

const fetchFacilityInfo = async (id) => {
    return await fetchFacilityInfoDb(id)
}

module.exports = { fetchFacilityInfo }