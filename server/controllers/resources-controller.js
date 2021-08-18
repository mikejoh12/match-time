const { fetchResources, createResource, removeResource, resourceBelongsToFacility } = require("../services/resources-service")
const { fetchFacilityInfo } = require('../services/facilities-service')

const getResources = async (req, res) => {
    const { facilityId } = req.params
    const facilityInfo = await fetchFacilityInfo(facilityId);
    if (!facilityInfo) {
        return res.status(422).json({error: "Invalid facility id."})
    }
    const resources = await fetchResources(facilityId)
    res.status(200).json(resources)
}

const postResource = async (req, res) => {
    const { facilityId } = req.params
    const { name, description } = req.body
    const newResource = await createResource({
                                facilityId,
                                name,
                                description
                            })
    res.status(201).json(newResource)
}

const deleteResource = async (req, res) => {
    const { facilityId, resourceId } = req.params
    const resource = await resourceBelongsToFacility({ facilityId, resourceId })
    if (!resource) {
        return res.status(401).json({error: "Resource does not belong to facility."})
    }
    await removeResource(resourceId)
    res.status(204).send()
}



module.exports = {
    getResources,
    postResource,
    deleteResource
}