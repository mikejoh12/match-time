
const { fetchFacilitiesByUserDb, fetchFacilityInfoDb, createFacilityDb, removeFacilityDb, fetchFacilitiesManagingByUserDb } = require('../db/facilities-db.js')
const { fetchResources, removeResource } = require('./resources-service.js')
const { createFacilityManagerDb, removeFacilityManagerDb } = require('../db/users-db.js')

const fetchFacilitiesByUser = async id => await fetchFacilitiesByUserDb(id)

const fetchFacilityInfo = async id => await fetchFacilityInfoDb(id)

const createFacility = async (facility, userId) => {
    const newFacility = await createFacilityDb(facility)
    await createFacilityManagerDb({
        facilityId: newFacility.id,
        userId
    })
    return newFacility
}

const removeFacility = async facilityId => {
    const resourceIds = (await fetchResources(facilityId)).map(resource => resource.id)
    // Remove all resources and associated bookings from a facility before deleting it
    await Promise.all(resourceIds.map(async resourceId => await removeResource(resourceId)))
    await removeFacilityManagerDb(facilityId)
    return await removeFacilityDb(facilityId)
}

const fetchFacilitiesManagingByUser = async (id) => await fetchFacilitiesManagingByUserDb(id)

module.exports = {  fetchFacilitiesByUser,
                    fetchFacilityInfo,
                    createFacility,
                    removeFacility,
                    fetchFacilitiesManagingByUser }