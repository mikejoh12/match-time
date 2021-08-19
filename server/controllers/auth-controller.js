const { fetchUserByEmail, createUser, createFacilityMember } = require('../services/users-service')
const { getPwdHash, createUnregisteredFacilityInvitation } = require('../services/auth-service')
const passport = require('passport')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
       user: process.env.MAIL_USER,
       pass: process.env.MAIL_PASS
    }
});

const signUpUser = async (req, res, next) => {
    const { email, firstName, lastName, password } = req.body

    //Check if active user with this email exists
    const userDb = await fetchUserByEmail(email)  
    if (userDb?.active === true) {
        return res.status(422).json({error:"User with this email already exists."})
    }

    const pwdHash = await getPwdHash(password)
    const user = {
        email,
        firstName,
        lastName,
        pwdHash,
        userRole: "customer"
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

                    const body = { id: user.id };
                    const token = jwt.sign({ user: body }, 'TOP_SECRET'); // TODO: Change secret
                    return res.json({
                        token,
                        user: {
                            id: user.id,
                            email: user.email,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            date_joined: user.date_joined,
                            user_role: user.user_role
                            }
                        });
                }
            );
        } catch (error) {
            return next(error);
            }
        }
    )(req, res, next);
}

const inviteUser = async (req, res, next) => {
    const { inviteEmail } = req.body;
    const { facilityId } = req.params;
    const user = await fetchUserByEmail(inviteEmail)
    if (!user) {
        // If there is no current user with the email, add the email and facility_id to invitations table in db.
        // When the user later registers, the user will become a member of the associated facility.
        await createUnregisteredFacilityInvitation({
                email: inviteEmail,
                facilityId
            })
        return res.status(200).json({message: 'Email address is not registered. Added invitation to facility so that user has access to it upon registration.'})
    }
    await createFacilityMember({
        userId: user.id,
        facilityId
    })
    const message = {
        from: 'mike@calendar-booking.com',
        to: inviteEmail,
        subject: 'You are invited to join our club',
        text: 'Click this link to join.'
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
          res.send(err)
        } else {
          res.status(200).json(info)
        }
    });

}

module.exports = { signUpUser, loginUser, inviteUser }