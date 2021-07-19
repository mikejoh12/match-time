const { fetchUserByEmail, createUser } = require('../services/users-service')
const { getPwdHash } = require('../services/auth-service')
const passport = require('passport')
const jwt = require('jsonwebtoken');

const signUpUser = async (req, res, next) => {
    const { email, first_name, last_name, password } = req.body

    //Check if active user with this email exists
    const userDb = await fetchUserByEmail(email)  
    if (userDb?.active === true) {
        return res.status(422).json({error:"User with this email already exists."})
    }

    const pwd_hash = await getPwdHash(password)
    const user = {
        email,
        first_name,
        last_name,
        pwd_hash,
        user_role: "customer"
    }
    const newUser = await createUser(user)
    res.status(201).json({users_id: newUser.id})
}

const loginUser = async (req, res, next) => {
    passport.authenticate(
        'login',
        async (err, user, info) => {
        try {
            if (err || !user) {
            const error = new Error(info.message);
            return next(error);
            }

            req.login(
            user,
            { session: false },
            async (error) => {
                if (error) return next(error);

                const body = { id: user.id, email: user.email };
                const token = jwt.sign({ user: body }, 'TOP_SECRET');
                console.log('User logged in: ' + JSON.stringify(body))
                return res.json({ token });
            }
            );
        } catch (error) {
            return next(error);
        }
        }
    )(req, res, next);
}

module.exports = { signUpUser, loginUser }