import { pool } from '../config/config.mjs'

export const fetchFacilityInfoDb = async (id) => {
    const res = await pool.query(
        `SELECT * FROM facilities WHERE id = $1`, [id]
    )
    return res.rows[0]
}