const { fetchResourcesDb, createResourceDb } = require('../db/resources-db.js')

const fetchResources = async id => {
    return await fetchResourcesDb(id)
}

const createResource = async resource => {
    return await createResourceDb(resource)
}


module.exports = {
    fetchResources,
    createResource
}