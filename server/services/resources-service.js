const { removeBookingsByResourceIdDb } = require('../db/bookings-db.js')
const { fetchResourcesDb, createResourceDb, deleteResourceDb, resourceBelongsToFacilityDb } = require('../db/resources-db.js')

const fetchResources = async id => await fetchResourcesDb(id)

const createResource = async resource => await createResourceDb(resource)

const removeResource = async id => {
    await removeBookingsByResourceIdDb(id) // First remove the bookings linked to a resource
    await deleteResourceDb(id)
}

const resourceBelongsToFacility = async (facility_id, resource_id) =>
    await resourceBelongsToFacilityDb(facility_id, resource_id)

module.exports = {
    fetchResources,
    createResource,
    removeResource,
    resourceBelongsToFacility
}