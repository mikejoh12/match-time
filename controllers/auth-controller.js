const { fetchUserByEmail, createUser, createFacilityMember, activateUser } = require('../services/users-service')
const { getPwdHash, createUnregisteredFacilityInvitation, fetchInvitationsByFacilityId, createResetToken, findValidResetToken, createVerifyEmailToken, findVerifyEmailToken } = require('../services/auth-service')
const { fetchFacilityInfo } = require('../services/facilities-service')
const passport = require('passport')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { deleteResetTokensDb, deleteVerifyEmailTokensDb } = require('../db/auth-db');
const { updateUserPwdDb } = require('../db/users-db');

const isProduction = process.env.NODE_ENV === 'production'

let transport = nodemailer.createTransport(
    isProduction ?
    {
        service: process.env.MAIL_PROD_SERVICE,
        auth:   { 
                user: process.env.MAIL_PROD_USER,
                pass: process.env.MAIL_PROD_PASS
                }
    }
    :
    {
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth:   {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
                }
    }
);

const signUpUser = async (req, res, next) => {
    const { email, firstName, lastName, password } = req.body

    //Check if active user with this email exists
    const userDb = await fetchUserByEmail(email)  
    if (userDb) {
        return res.status(422).json({
            error: { status: 422, data: "User with this email already exists."}
        })
    }

    const pwdHash = await getPwdHash(password)
    const user = {
        email,
        firstName,
        lastName,
        pwdHash,
        userRole: "customer",
        active: false
    }
    const newUser = await createUser(user)
    const token = await createVerifyEmailToken(email);
    // Send email if environment is not set to test
    if (process.env.NODE_ENV !== 'test') {
        await transport.sendMail({
            from: 'info@matchtime.herokuapp.com',
            to: email,
            subject: `MatchTime - Account Activation`,
            html:`<html><head></head><body><h1>MatchTime Account Activation</h1><p>To confirm this email and activate your account, please click <a href='${process.env.BASE_URL}/confirm-email/${encodeURIComponent(email)}/${encodeURIComponent(token)}'>here</a>.</p></body></html>`
            })
    }

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
                    const token = jwt.sign(
                        { user: body },
                        process.env.AUTH_SECRET,
                        { expiresIn: 20 } // Expiration in s
                    );

                    // Refresh-token in cookie
                    const refreshToken = jwt.sign(
                        { user: body },
                        process.env.REFRESH_AUTH_SECRET,
                        { expiresIn: 60 * 60 * 24 } // Expiration in s
                    );

                    res.cookie('SB_REFR', refreshToken, {
                        httpOnly: true,
                        sameSite: isProduction ? 'strict' : 'lax',
                        secure: isProduction ? true : false,
                      })

                    return res.json({
                        token,
                        user: {
                            id: user.id,
                            email: user.email,
                            first_name: user.first_name,
                            last_name: user.last_name,
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

const logoutUser = (req, res, next) => {
    res.clearCookie('SB_REFR')
    return res.status(200).send()
}

const refreshToken = async (req, res, next) => {
    passport.authenticate(
        'jwt-refresh',
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
                    const token = jwt.sign(
                        { user: body },
                        process.env.AUTH_SECRET,
                        { expiresIn: 60 * 10 } // Expiration in s
                    );
                    const refreshToken = jwt.sign(
                        { user: body },
                        process.env.REFRESH_AUTH_SECRET,
                        { expiresIn: 60 * 60 * 24 } // Expiration in s
                    );

                    res.cookie('SB_REFR', refreshToken, {
                        httpOnly: true,
                        sameSite: 'strict',
                        secure: isProduction ? true : false,
                      })

                    return res.json({
                        token,
                        user: {
                            id: user.id,
                            email: user.email,
                            first_name: user.first_name,
                            last_name: user.last_name,
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
        return res.status(422).json({error: { status: 422, data: "Invalid facility id." }
        })
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
            from: 'info@matchtime.herokuapp.com',
            to: inviteEmail,
            subject: `You are invited to our club: ${facilityInfo.name}`,
            text: `Go to ${process.env.BASE_URL}/${facilityId} and create an account with MatchTime to access the club scheduling features.`
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
        return res.status(422).json({
            error: { status: 422, data: "Invalid facility id."}
        })
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
            from: 'info@matchtime.herokuapp.com',
            to: email,
            subject: `MatchTime - Password Reset`,
            html:`<html><head></head><body><h1>MatchTime Password Reset</h1><p>To reset your password, please click <a href='${process.env.BASE_URL}/password-reset/${encodeURIComponent(email)}/${encodeURIComponent(token)}'>here</a>. This link is valid for 1 hr.</p></body></html>`
            })
    }

    return res.json({status: 'ok'});
}

const resetPassword = async (req, res) => {
    const { email, password, token } = req.body;
    
    // Check the submitted token for a record in db
    const record = await findValidResetToken({email, token});
    if (record == null) {
        return res.status(401).json({
            error: { status: 401, data: 'Token not found. Please try the reset password process again.'}
        });
    }

    // Delete reset tokens for email
    await deleteResetTokensDb(email);

    const pwdHash = await getPwdHash(password);
    await updateUserPwdDb({email, pwdHash});
    return res.json({
        status: 'ok',
        message: 'Password reset. Please login with your new password.'
    });
}

const confirmEmail = async(req, res) => {
    const { email, token } = req.body

    // Check if user is invalid or has already activated
    const user = await fetchUserByEmail(email);
    if (user == null) {
        return res.status(403).json({
            error: {
                status: 403,
                data:   { message: `User ${email} has not registered an account.`}
                }
            });
    }
    if (user.active) {
        return res.status(403).json({
            error: {
                status: 403,
                data: { message: `This user (${email}) has already been activated. Try loggin in.`}
            }})
    }

    // Check for a valid token/email combination
    const record = await findVerifyEmailToken({email, token});
    if (record == null) {
        return res.status(403).json({
            error: {
                status: 403,
                data: {
                    reason: 'no-token',
                    message: 'Unexpired token not found. Please try the email verification process again.'
                }
            }
        });
    }

    // Activate user
    await activateUser(email);

    // Delete used token
    await deleteVerifyEmailTokensDb(email)
    
    return res.json({
        status: 'ok',
        message: 'Email has been confirmed. Please login with your password.'
    });
}

const resendConfirmEmail = async(req, res) => {
    const { email } = req.body
    const user = await fetchUserByEmail(email);

    if (user == null) {
        return res.json({ error: {status: 403, data: `User ${email} has not registered an account.`}});
    }
    if (user.active) {
        return res.json({ error: {status: 403, data: `This user (${email}) has already been activated. Try loggin in.`}})
    }

    const token = await createVerifyEmailToken(email);

    // Send email if environment is not set to test
    if (process.env.NODE_ENV !== 'test') {
        await transport.sendMail({
            from: 'info@matchtime.herokuapp.com',
            to: email,
            subject: `MatchTime - Account Activation`,
            html:`<html><head></head><body><h1>MatchTime Account Activation</h1><p>To confirm this email and activate your account, please click <a href='${process.env.BASE_URL}/confirm-email/${encodeURIComponent(email)}/${encodeURIComponent(token)}'>here</a>.</p></body></html>`
            })
    }

    return res.json({status: 'ok'})
}

module.exports = { signUpUser, loginUser, inviteUser, getInvitationsByFacilityId, forgotPassword, resetPassword, refreshToken, confirmEmail, resendConfirmEmail, logoutUser }