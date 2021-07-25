const { fetchResources, createResource, removeResource, resourceBelongsToFacility } = require("../services/resources-service")
const { fetchFacilityInfo } = require('../services/facilities-service')

const getResources = async (req, res) => {
    const { id } = req.params
    const facilityInfo = await fetchFacilityInfo(id);
    if (!facilityInfo) {
        return res.status(422).json({error: "Invalid facility id."})
    }
    const resources = await fetchResources(id)
    res.status(200).json(resources)
}

const postResource = async (req, res) => {
    const { id: facilities_id } = req.params
    const { name, description } = req.body
    const newResource = await createResource({
                                facilities_id,
                                name,
                                description
                            })
    res.status(201).json(newResource)
}

const deleteResource = async (req, res) => {
    const { id: facility_id, resource_id } = req.params
    const resource = await resourceBelongsToFacility(facility_id, resource_id)
    if (!resource) {
        return res.status(401).json({error: "Resource does not belong to facility."})
    }
    await removeResource(resource_id)
    res.status(204).send()
}



module.exports = {
    getResources,
    postResource,
    deleteResource
}