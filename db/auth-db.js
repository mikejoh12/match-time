const db = require('../config/db.js')

const createUnregisteredFacilityInvitationDb = async ({email, facilityId}) => {
    const text = `INSERT INTO invitations(email, facilities_id)
                  VALUES($1, $2) RETURNING *`
    const values = [email, facilityId]
    const res = await db.query(text, values)
    return res.rows[0]
}

const removeUnregisteredFacilityInvitationDb = async ({email, facilityId}) => {
    const text = `DELETE FROM invitations WHERE email = $1 AND facilities_id = $2`
    const values = [email, facilityId]
    const res = await db.query(text, values)
    return res.rows
}

const fetchInvitationsByEmailDb = async (email) => {
    const text = `SELECT * FROM invitations WHERE email = $1`
    const values = [email]
    const res = await db.query(text, values)
    return res.rows
}

const fetchInvitationsByFacilityIdDb = async (facilityId) => {
    const text = `SELECT * FROM invitations WHERE facilities_id = $1`
    const values = [facilityId]
    const res = await db.query(text, values)
    return res.rows
}

const deleteResetTokensDb = async (email) => {
    const text = `  DELETE FROM reset_tokens
                    WHERE email = $1`
    values = [email]
    const res = await db.query(text, values)
    return res.rows
}

const resetTokenCreateDb = async ({email, token, expiration, used}) => {
    const text = `INSERT INTO reset_tokens(email, token, expiration, used, created_at, updated_at)
                  VALUES($1, $2, $3, $4, NOW(), NOW()) RETURNING *`
    const values = [email, token, expiration, used]
    const res = await db.query(text, values)
    return res.rows[0]
}

const findValidResetTokenDb = async ({email, token}) => {
    const text = `  SELECT * FROM reset_tokens
                    WHERE email = $1 AND
                    token = $2 AND
                    expiration::timestamptz > now() AND
                    used = 0`;
    const values = [email, token];
    const res = await db.query(text, values);
    return res.rows[0];
}

const deleteVerifyEmailTokensDb = async(email) => {
    const text = `  DELETE FROM verify_email_tokens
                    WHERE email = $1`
    const values = [email]
    const res = await db.query(text, values);
    return res.rows
}

const createVerifyEmailTokenDb = async ({email, token, expiration}) => {
    const text = `INSERT INTO verify_email_tokens (email, token, expiration, created_at)
                  VALUES($1, $2, $3, NOW()) RETURNING *`
    const values = [email, token, expiration]
    const res = await db.query(text, values)
    return res.rows[0]
}

const findVerifyEmailTokenDb = async({email, token}) => {
    const text = `  SELECT * FROM verify_email_tokens
                    WHERE email = $1 AND
                    token = $2 AND
                    expiration::timestamptz > now()`;
    const values = [email, token];
    const res = await db.query(text, values);
    return res.rows[0];
}

module.exports = {
    createUnregisteredFacilityInvitationDb,
    removeUnregisteredFacilityInvitationDb,
    fetchInvitationsByEmailDb,
    fetchInvitationsByFacilityIdDb,
    deleteResetTokensDb,
    resetTokenCreateDb,
    findValidResetTokenDb,
    deleteVerifyEmailTokensDb,
    createVerifyEmailTokenDb,
    findVerifyEmailTokenDb
}
