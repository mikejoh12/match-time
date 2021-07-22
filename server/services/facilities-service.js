
const { fetchFacilitiesByUserDb, fetchFacilityInfoDb, createFacilityDb, removeFacilityDb } = require('../db/facilities-db.js')
const { fetchResources, removeResource } = require('./resources-service.js')
const { createFacilityManagerDb } = require('../db/users-db.js')

const fetchFacilitiesByUser = async id => await fetchFacilitiesByUserDb(id)

const fetchFacilityInfo = async id => await fetchFacilityInfoDb(id)

const createFacility = async facility => {
    const newFacility = await createFacilityDb(facility)
    console.log(newFacility)
    await createFacilityManagerDb({
        facilityId: newFacility.id,
        userId: 6 // TO DO - Connect user
    })
    return newFacility
}

const removeFacility = async id => {
    const resourceIds = (await fetchResources(id)).map(resource => resource.id)
    // Remove all resources and associated bookings from a facility before deleting it
    await Promise.all(resourceIds.map(async id => await removeResource(id)))
    return await removeFacilityDb(id)
}

module.exports = {  fetchFacilitiesByUser,
                    fetchFacilityInfo,
                    createFacility,
                    removeFacility }