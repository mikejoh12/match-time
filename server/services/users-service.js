const { fetchUserByEmailDb, fetchUserByIdDb, createUserDb } = require('../db/users-db')

const fetchUserByEmail = async (email) => await fetchUserByEmailDb(email)

const fetchUserById = async id => await fetchUserByIdDb(id)

const createUser = async (user) => await createUserDb(user)

module.exports = { fetchUserByEmail, fetchUserById, createUser }