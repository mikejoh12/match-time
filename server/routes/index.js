const passport = require('passport')
const Router = require('express-promise-router')

const { getFacilityInfo, postFacility, getFacilitesByUser, deleteFacility } = require('../controllers/facilities-controller.js')
const { signUpUser, loginUser, inviteUser } = require('../controllers/auth-controller.js')
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
        validateDeleteFacility } = require('./validation')
const { getResources, postResource, deleteResource } = require('../controllers/resources-controller.js')
const { getUsersByFacility } = require('../controllers/users-controller.js')

const router = new Router()

router  
    .get('/facilities/by_user', passport.authenticate('jwt-customer', {session: false}), getFacilitesByUser)
    .get('/facilities/:facilityId', validateGetFacilityInfo, getFacilityInfo)
    .post('/facilities', validatePostFacility, passport.authenticate('jwt-customer', {session: false}), postFacility)
    .delete('/facilities/:facilityId',  validateDeleteFacility, passport.authenticate('jwt-manager', {session: false}), deleteFacility)

    .get('/resources/by_facility/:facilityId', validateGetResources, passport.authenticate('jwt-customer', {session: false}), getResources)
    .post('/resources/by_facility/:facilityId', validatePostResource, passport.authenticate('jwt-manager', {session: false}), postResource)
    .delete('/resources/by_facility/:facilityId/:resourceId', validateDeleteResource, passport.authenticate('jwt-manager', {session: false}), deleteResource)

    .post('/auth/signup', validateSignUpUser, signUpUser)
    .post('/auth/login', validateLoginUser, loginUser)
    .post('/auth/invite/:facilityId', passport.authenticate('jwt-manager', {session: false}), inviteUser)

    .get('/users/by_facility/:facilityId', passport.authenticate('jwt-manager', {session: false}), getUsersByFacility )

    .get('/bookings/by_facility/:facilityId', validateGetBookings, passport.authenticate('jwt-customer', {session: false}), getBookingsByFacility)
    .get('/bookings/by_user', passport.authenticate('jwt-customer', {session: false}), getBookingsByUser)
    .post('/bookings', validatePostBooking, passport.authenticate('jwt-customer', {session: false}), postBooking)
    .delete('/bookings/:bookingId', validateDeleteBooking, passport.authenticate('jwt-customer', {session: false}), deleteBooking)


module.exports = router