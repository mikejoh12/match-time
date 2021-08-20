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

module.exports = {
    createUnregisteredFacilityInvitationDb,
    removeUnregisteredFacilityInvitationDb,
    fetchInvitationsByEmailDb,
    fetchInvitationsByFacilityIdDb
}