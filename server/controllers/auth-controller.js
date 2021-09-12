const { fetchUserByEmail, createUser, createFacilityMember } = require('../services/users-service')
const { getPwdHash, createUnregisteredFacilityInvitation, fetchInvitationsByFacilityId, createResetToken } = require('../services/auth-service')
const { fetchFacilityInfo } = require('../services/facilities-service')
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
    if (userDb) {
        return res.status(422).json({error:"User with this email already exists."})
    }

    const pwdHash = await getPwdHash(password)
    const user = {
        email,
        firstName,
        lastName,
        pwdHash,
        userRole: "customer",
        active: true
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
    const facilityInfo = await fetchFacilityInfo(facilityId)
    if (!facilityInfo) {
        return res.status(422).json({error: "Invalid facility id."})
    }
    const user = await fetchUserByEmail(inviteEmail)
    
    if (!user) {
        // If there is no current user with the email, add the email and facility_id to invitations table in db.
        // When the user later registers, the user will become a member of the associated facility.
        await createUnregisteredFacilityInvitation({
                email: inviteEmail,
                facilityId
            })

        let info = await transport.sendMail({
            from: 'mike@calendar-booking.com',
            to: inviteEmail,
            subject: `You are invited to our club: ${facilityInfo.name}`,
            text: `Go to http://calendar-booking.com/${facilityId} and create an account with Calendar-Booking to access the club scheduling features.`
            })
        console.log(`Message sent: ${info.messageId}`);

        return res.status(200).json({message: 'Email address is not registered. Added invitation to facility so that user has access to it upon registration.'})
    }
    
    await createFacilityMember({
        userId: user.id,
        facilityId
    })
    return res.status(200).json({message: `User has been invited to the facility: ${facilityInfo.name}`})
}

const getInvitationsByFacilityId = async (req, res) => {
    const { facilityId } = req.params
    const facilityInfo = await fetchFacilityInfo(facilityId)
    if (!facilityInfo) {
        return res.status(422).json({error: "Invalid facility id."})
    }

    const invitations = await fetchInvitationsByFacilityId(facilityId)
    res.status(200).json(invitations)
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await fetchUserByEmail(email);
    // Don't make it obvious that no email exists
    if (user == null) {
        console.log('No email match found')
        return res.json({status: 'ok'});
    }
    console.log('Email match found')
    const token = await createResetToken(email);

    let msg = await transport.sendMail({
        from: 'mike@calendar-booking.com',
        to: email,
        subject: `Password Reset`,
        text:`To reset your password, please click the link below.\n\nhttp://localhost/reset-password?token=${encodeURIComponent(token)}&email=${email}`
        })
    console.log(`Message sent: ${msg.messageId}`);

    return res.json({status: 'ok'});
}

module.exports = { signUpUser, loginUser, inviteUser, getInvitationsByFacilityId, forgotPassword }