const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { addHours } = require('date-fns');

const { createUnregisteredFacilityInvitationDb, fetchInvitationsByFacilityIdDb, resetTokenUpdateUsedDb, resetTokenCreateDb, findValidResetTokenDb } = require('../db/auth-db')

const getPwdHash = async pwd => {
    const hash = await bcrypt.hash(pwd, 10)
    return hash
}

const createUnregisteredFacilityInvitation = async (invitation) => await createUnregisteredFacilityInvitationDb(invitation)

const fetchInvitationsByFacilityId = async (facilityId) => await fetchInvitationsByFacilityIdDb(facilityId);

const createResetToken = async (email) => {
  // Mark old tokens for that email as used
  await resetTokenUpdateUsedDb(email);
  const token = crypto.randomBytes(64).toString('base64');
  // Token expires after one hour
  let expireDate = addHours(new Date(), 1);

  // Insert token into db
  await resetTokenCreateDb({
    email,
    expiration: expireDate,
    token,
    used: 0
  })
  return token
}

const findValidResetToken = async (tokenInfo) => await findValidResetTokenDb(tokenInfo)

module.exports = {
  getPwdHash,
  createUnregisteredFacilityInvitation,
  fetchInvitationsByFacilityId,
  createResetToken,
  findValidResetToken
}