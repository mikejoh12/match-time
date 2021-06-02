import { fetchFacilityInfo } from '../services/facilities-service.mjs'

export const getFacilityInfo = async (req, res) => {
    const { id } = req.params
    const facilityInfo = await fetchFacilityInfo(id);
    res.status(200).json(facilityInfo);
}