const { fetchInvitationsByEmailDb, removeUnregisteredFacilityInvitationDb } = require('../db/auth-db')
const { fetchUserByEmailDb,
        fetchUserByIdDb,
        createUserDb,
        fetchManagerByIdDb,
        createFacilityMemberDb,
        fetchMembersByFacilityIdDb }
        = require('../db/users-db')

const fetchUserByEmail = async email => await fetchUserByEmailDb(email)

const fetchUserById = async id => await fetchUserByIdDb(id)

const createUser = async user => {
    const newUser = await createUserDb(user)
    
    // Check if there are invites to facilities for the unregistered user
    const invites = await fetchInvitationsByEmailDb(user.email)
    
    // If there are invites, then we add those memberships in users_facilities table and remove the invites
    await Promise.all(invites.map(async invite => {
        await createFacilityMemberDb({
            userId: newUser.id,
            facilityId: invite.facilities_id
        })
        return await removeUnregisteredFacilityInvitationDb({
            email: newUser.email,
            facilityId: invite.facilities_id
        })
    }))

    return newUser
}

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