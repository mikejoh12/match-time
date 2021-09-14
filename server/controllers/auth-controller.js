const { fetchUserByEmail, createUser, createFacilityMember } = require('../services/users-service')
const { getPwdHash, createUnregisteredFacilityInvitation, fetchInvitationsByFacilityId, createResetToken, findValidResetToken } = require('../services/auth-service')
const { fetchFacilityInfo } = require('../services/facilities-service')
const passport = require('passport')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { resetTokenUpdateUsedDb } = require('../db/auth-db');
const { updateUserPwdDb } = require('../db/users-db');

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
        return res.json({status: 'ok'});
    }

    const token = await createResetToken(email);

    // Send email if environment is not set to test
    if (process.env.NODE_ENV !== 'test') {
        await transport.sendMail({
            from: 'mike@calendar-booking.com',
            to: email,
            subject: `Sports Booker - Password Reset`,
            html:`<p>To reset your password, please click <a href="http://localhost:3000/password-reset/${email}/${encodeURIComponent(token)}"/>here</a>. This link is valid for 1 hr.</p>`
            })
    }

    return res.json({status: 'ok'});
}

const resetPassword = async (req, res) => {
    const { email, password, token } = req.body;
    
    // Check the submitted token for a record in db
    const record = await findValidResetToken({email, token});
    if (record == null) {
        return res.status(401).json({status: 'error', message: 'Token not found. Please try the reset password process again.'});
    }

    // Mark tokens associated with email as used
    await resetTokenUpdateUsedDb(email);

    const pwdHash = await getPwdHash(password);
    await updateUserPwdDb({email, pwdHash});
    return res.json({
        status: 'ok',
        message: 'Password reset. Please login with your new password.'
    });
}

module.exports = { signUpUser, loginUser, inviteUser, getInvitationsByFacilityId, forgotPassword, resetPassword }