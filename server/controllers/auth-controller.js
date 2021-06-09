const { fetchUserByEmail, createUser } = require('../services/users-service')
const { getPwdHash } = require('../services/auth-service')

const signUpUser = async (req, res, next) => {
    const { email, password } = req.body

    //Check if active user with this email exists
    const userDb = await fetchUserByEmail(email)  
    if (userDb?.active === true) {
        return res.status(422).json({error:"User with this email already exists."})
    }

    const pwd_hash = await getPwdHash(password)
    const user = {
        email,
        pwd_hash,
        user_role: "customer"
    }
    const newUser = await createUser(user)
    res.status(201).json({users_id: newUser.id})
}

module.exports = { signUpUser }