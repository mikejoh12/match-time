import { fetchFacilityInfoDb } from '../db/facilities-db.mjs'

export const fetchFacilityInfo = async (id) => {
    return await fetchFacilityInfoDb(id)
}