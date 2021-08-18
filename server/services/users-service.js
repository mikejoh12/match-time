const { fetchUserByEmailDb,
        fetchUserByIdDb,
        createUserDb,
        fetchManagerByIdDb,
        createFacilityMemberDb,
        fetchMembersByFacilityIdDb }
        = require('../db/users-db')

const fetchUserByEmail = async email => await fetchUserByEmailDb(email)

const fetchUserById = async id => await fetchUserByIdDb(id)

const createUser = async user => await createUserDb(user)

const fetchManagerById = async (facilityId, userId) => await fetchManagerByIdDb(facilityId, userId)

const createFacilityMember = async ({userId, facilityId}) => {
    return await createFacilityMemberDb({
        userId,
        facilityId
    })
}

const fetchMembersByFacilityId = async facilityId => await fetchMembersByFacilityIdDb(facilityId)

module.exports = {  fetchUserByEmail,
                    fetchUserById,
                    createUser,
                    fetchManagerById,
                    createFacilityMember,
                    fetchMembersByFacilityId }