const { fetchUserByEmailDb, createUserDb } = require('../db/users-db')

const fetchUserByEmail = async (email) => {
    return await fetchUserByEmailDb(email)
}

const createUser = async (user) => {
    return await createUserDb(user)
}

module.exports = { fetchUserByEmail, createUser }