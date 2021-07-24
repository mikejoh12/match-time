const { fetchUserByEmailDb, fetchUserByIdDb, createUserDb, fetchManagerByIdDb } = require('../db/users-db')

const fetchUserByEmail = async email => await fetchUserByEmailDb(email)

const fetchUserById = async id => await fetchUserByIdDb(id)

const createUser = async user => await createUserDb(user)

const fetchManagerById = async (facilityId, userId) => await fetchManagerByIdDb(facilityId, userId)

module.exports = { fetchUserByEmail, fetchUserById, createUser, fetchManagerById }