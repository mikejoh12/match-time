const { fetchResources, createResource, removeResource } = require("../services/resources-service")
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
    const { facilities_id } = req.body
    const facilityInfo = await fetchFacilityInfo(facilities_id);
    if (!facilityInfo) {
        return res.status(422).json({error: "Invalid facility id."})
    }
    const newResource = await createResource(req.body)
    res.status(201).json(newResource)
}

const deleteResource = async (req, res) => {
    const { id } = req.params
    await removeResource(id)
    res.status(204).send()
}

module.exports = {
    getResources,
    postResource,
    deleteResource
}