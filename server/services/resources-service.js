const { fetchResourcesDb } = require('../db/resources-db.js')

const fetchResources = async id => {
    return await fetchResourcesDb(id)
}

module.exports = {
    fetchResources
}