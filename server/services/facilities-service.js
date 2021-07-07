
const { fetchFacilitiesDb, fetchFacilityInfoDb, createFacilityDb, removeFacilityDb } = require('../db/facilities-db.js')
const { fetchResources, removeResource } = require('./resources-service.js')

const fetchFacilities = async () => await fetchFacilitiesDb()

const fetchFacilityInfo = async id => await fetchFacilityInfoDb(id)

const createFacility = async facility => await createFacilityDb(facility)

const removeFacility = async id => {
    console.log('In remove Facility service')
    const resourceIds = (await fetchResources(id)).map(resource => resource.id)
    console.log(resourceIds)
    // Remove all resources and associated bookings from a facility before deleting it
    await Promise.all(resourceIds.map(async id => await removeResource(id)))
    return await removeFacilityDb(id)
}

module.exports = {  fetchFacilities,
                    fetchFacilityInfo,
                    createFacility,
                    removeFacility }