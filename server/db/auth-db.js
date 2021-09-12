const { pool } = require('../config/config.js')

const createUnregisteredFacilityInvitationDb = async ({email, facilityId}) => {
    const text = `INSERT INTO invitations(email, facilities_id)
                  VALUES($1, $2) RETURNING *`
    const values = [email, facilityId]
    const res = await pool.query(text, values)
    return res.rows[0]
}

const removeUnregisteredFacilityInvitationDb = async ({email, facilityId}) => {
    const text = `DELETE FROM invitations WHERE email = $1 AND facilities_id = $2`
    const values = [email, facilityId]
    const res = await pool.query(text, values)
    return res.rows
}

const fetchInvitationsByEmailDb = async (email) => {
    const text = `SELECT * FROM invitations WHERE email = $1`
    const values = [email]
    const res = await pool.query(text, values)
    return res.rows
}

const fetchInvitationsByFacilityIdDb = async (facilityId) => {
    const text = `SELECT * FROM invitations WHERE facilities_id = $1`
    const values = [facilityId]
    const res = await pool.query(text, values)
    return res.rows
}

const resetTokenUpdateUsedDb = async (email) => {
    const text = `  UPDATE reset_tokens
                    SET used = 1, updated_at = NOW()
                    WHERE email = $1`
    values = [email]
    const res = await pool.query(text, values)
    return res.rows
}

const resetTokenCreateDb = async ({email, token, expiration, used}) => {
    const text = `INSERT INTO reset_tokens(email, token, expiration, used, created_at, updated_at)
                  VALUES($1, $2, $3, $4, NOW(), NOW()) RETURNING *`
    const values = [email, token, expiration, used]
    const res = await pool.query(text, values)
    return res.rows[0]
}

module.exports = {
    createUnregisteredFacilityInvitationDb,
    removeUnregisteredFacilityInvitationDb,
    fetchInvitationsByEmailDb,
    fetchInvitationsByFacilityIdDb,
    resetTokenUpdateUsedDb,
    resetTokenCreateDb
}