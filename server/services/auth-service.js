const bcrypt = require('bcrypt')

const { createUnregisteredFacilityInvitationDb } = require('../db/auth-db')

const getPwdHash = async pwd => {
    const hash = await bcrypt.hash(pwd, 10)
    return hash
}

const createUnregisteredFacilityInvitation = invitation => createUnregisteredFacilityInvitationDb(invitation)

module.exports = {
  getPwdHash,
  createUnregisteredFacilityInvitation
}