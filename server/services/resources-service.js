const { removeBookingsByResourceIdDb } = require('../db/bookings-db.js')
const { fetchResourcesDb, createResourceDb, deleteResourceDb, resourceBelongsToFacilityDb } = require('../db/resources-db.js')

const fetchResources = async facilityId => await fetchResourcesDb(facilityId)

const createResource = async resource => await createResourceDb(resource)

const removeResource = async resourceId => {
    await removeBookingsByResourceIdDb(resourceId) // First remove the bookings linked to a resource
    await deleteResourceDb(resourceId)
}

const resourceBelongsToFacility = async resourceInfo =>
    await resourceBelongsToFacilityDb(resourceInfo)

module.exports = {
    fetchResources,
    createResource,
    removeResource,
    resourceBelongsToFacility
}