const { fetchFacilitiesDb, fetchFacilityInfoDb, createFacilityDb } = require('../db/facilities-db.js')

const fetchFacilities = async () => {
    return await fetchFacilitiesDb()
}

const fetchFacilityInfo = async (id) => {
    return await fetchFacilityInfoDb(id)
}

const createFacility = async (facility) => {
    return await createFacilityDb(facility)
}

module.exports = {  fetchFacilities,
                    fetchFacilityInfo,
                    createFacility }