const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { addHours } = require('date-fns');

const { createUnregisteredFacilityInvitationDb,
        fetchInvitationsByFacilityIdDb,
        deleteResetTokensDb,
        resetTokenCreateDb,
        findValidResetTokenDb,
        deleteVerifyEmailTokensDb,
        createVerifyEmailTokenDb,
        findVerifyEmailTokenDb
      } = require('../db/auth-db')

const getPwdHash = async pwd => {
    const hash = await bcrypt.hash(pwd, 10)
    return hash
}

const createUnregisteredFacilityInvitation = async (invitation) => await createUnregisteredFacilityInvitationDb(invitation)

const fetchInvitationsByFacilityId = async (facilityId) => await fetchInvitationsByFacilityIdDb(facilityId);

const createResetToken = async (email) => {
  // Delete old reset tokens for email
  await deleteResetTokensDb(email);
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

const createVerifyEmailToken = async (email) => {
  // Delete old tokens for that email if any exist
  await deleteVerifyEmailTokensDb(email);
  const token = crypto.randomBytes(64).toString('base64');
  // Token expires after one hour
  let expireDate = addHours(new Date(), 1);

  // Insert token into db
  await createVerifyEmailTokenDb({
    email,
    expiration: expireDate,
    token,
  })
  return token
}

const findValidResetToken = async (tokenInfo) => await findValidResetTokenDb(tokenInfo)

const findVerifyEmailToken = async (tokenInfo) => await findVerifyEmailTokenDb(tokenInfo)

module.exports = {
  getPwdHash,
  createUnregisteredFacilityInvitation,
  fetchInvitationsByFacilityId,
  createResetToken,
  findValidResetToken,
  createVerifyEmailToken,
  findVerifyEmailToken
}