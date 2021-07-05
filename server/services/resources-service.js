const { removeBookingsByResourceIdDb } = require('../db/bookings-db.js')
const { fetchResourcesDb, createResourceDb, deleteResourceDb } = require('../db/resources-db.js')

const fetchResources = async id => await fetchResourcesDb(id)

const createResource = async resource => await createResourceDb(resource)

const removeResource = async id => {
    await removeBookingsByResourceIdDb(id) // First remove the bookings linked to a resource
    await deleteResourceDb(id)
}

module.exports = {
    fetchResources,
    createResource,
    removeResource
}