const passport = require('passport')
const Router = require('express-promise-router')

const { getFacilityInfo, postFacility, getFacilitesByUser, deleteFacility } = require('../controllers/facilities-controller.js')
const { signUpUser, loginUser, refreshToken, inviteUser, getInvitationsByFacilityId, forgotPassword, resetPassword, confirmEmail, resendConfirmEmail, logoutUser } = require('../controllers/auth-controller.js')
const { getBookingsByFacility, getBookingsByUser, postBooking, deleteBooking } = require('../controllers/bookings-controller.js')
const { validateGetFacilityInfo,
        validatePostFacility,
        validateGetResources,
        validateSignUpUser,
        validateLoginUser,
        validateGetBookings,
        validatePostBooking,
        validateDeleteBooking, 
        validatePostResource,
        validateDeleteResource,
        validateDeleteFacility, 
        validateResetPassword,
        validateForgotPassword,
        validateConfirmEmail,
        validateResendConfirmEmail} = require('./validation')
const { getResources, postResource, deleteResource } = require('../controllers/resources-controller.js')
const { getUsersByFacility } = require('../controllers/users-controller.js')

const router = new Router()

router  
    .get('/facilities/by_user', passport.authenticate('jwt-customer', {session: false, failWithError: true}), getFacilitesByUser)
    .get('/facilities/:facilityId', validateGetFacilityInfo, getFacilityInfo)
    .post('/facilities', validatePostFacility, passport.authenticate('jwt-customer', {session: false, failWithError: true}), postFacility)
    .delete('/facilities/:facilityId',  validateDeleteFacility, passport.authenticate('jwt-manager', {session: false, failWithError: true}), deleteFacility)

    .get('/resources/by_facility/:facilityId', validateGetResources, getResources)
    .post('/resources/by_facility/:facilityId', validatePostResource, passport.authenticate('jwt-manager', {session: false, failWithError: true}), postResource)
    .delete('/resources/by_facility/:facilityId/:resourceId', validateDeleteResource, passport.authenticate('jwt-manager', {session: false, failWithError: true}), deleteResource)

    .post('/auth/signup', validateSignUpUser, signUpUser)
    .post('/auth/login', validateLoginUser, loginUser)
    .post('/auth/logout', logoutUser)
    .post('/auth/invite/:facilityId', passport.authenticate('jwt-manager', {session: false, failWithError: true}), inviteUser)
    .get('/auth/invite/:facilityId', passport.authenticate('jwt-manager', {session: false, failWithError: true}), getInvitationsByFacilityId)
    .post('/auth/password_forgot', validateForgotPassword, forgotPassword)
    .post('/auth/password_reset', validateResetPassword, resetPassword)
    .post('/auth/refresh_token', refreshToken)
    .post('/auth/confirm_email', validateConfirmEmail, confirmEmail)
    .post('/auth/resend_confirm_email', validateResendConfirmEmail, resendConfirmEmail)

    .get('/users/by_facility/:facilityId', passport.authenticate('jwt-manager', {session: false, failWithError: true}), getUsersByFacility )

    .get('/bookings/by_facility/:facilityId', validateGetBookings, passport.authenticate('jwt-customer', {session: false, failWithError: true}), getBookingsByFacility)
    .get('/bookings/by_user', passport.authenticate('jwt-customer', {session: false, failWithError: true}), getBookingsByUser)
    .post('/bookings', validatePostBooking, passport.authenticate('jwt-customer', {session: false, failWithError: true}), postBooking)
    .delete('/bookings/:bookingId', validateDeleteBooking, passport.authenticate('jwt-customer', {session: false, failWithError: true}), deleteBooking)


module.exports = router