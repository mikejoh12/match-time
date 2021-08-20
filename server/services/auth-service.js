const bcrypt = require('bcrypt')

const { createUnregisteredFacilityInvitationDb, fetchInvitationsByFacilityIdDb } = require('../db/auth-db')

const getPwdHash = async pwd => {
    const hash = await bcrypt.hash(pwd, 10)
    return hash
}

const createUnregisteredFacilityInvitation = invitation => createUnregisteredFacilityInvitationDb(invitation)

const fetchInvitationsByFacilityId = facilityId => fetchInvitationsByFacilityIdDb(facilityId);

module.exports = {
  getPwdHash,
  createUnregisteredFacilityInvitation,
  fetchInvitationsByFacilityId
}