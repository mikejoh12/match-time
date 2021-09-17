const { fetchResources, createResource, removeResource, resourceBelongsToFacility } = require("../services/resources-service")
const { fetchFacilityInfo } = require('../services/facilities-service')

const getResources = async (req, res) => {
    const { facilityId } = req.params
    const facilityInfo = await fetchFacilityInfo(facilityId);
    if (!facilityInfo) {
        return res.status(422).json({
            error: { status: 422, data: "Invalid facility id." }
        })
    }
    const resources = await fetchResources(facilityId)
    res.status(200).json(resources)
}

const postResource = async (req, res) => {
    const { facilityId } = req.params
    const { name, description } = req.body
    const facilityInfo = await fetchFacilityInfo(facilityId);
    if (!facilityInfo) {
        return res.status(422).json({
            error: { status: 422, data: "Invalid facility id." }
        })
    }

    // Allow max 10 resources per facility - check current number
    const resources = await fetchResources(facilityId)
    if (resources.length >= 10) {
        return res.status(422).json({
            error: { status: 422, data: "Facility is limited to max 10 resources." }
        })
    }

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
        return res.status(401).json({
            error: { status: 401, data: "Resource does not belong to facility." }
        })
    }
    await removeResource(resourceId)
    res.status(204).send()
}

module.exports = {
    getResources,
    postResource,
    deleteResource
}