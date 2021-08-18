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

const router = new Router()

router  
    .get('/facilities/by_user', passport.authenticate('jwt-customer', {session: false}), getFacilitesByUser)
    .get('/facilities/:id', validateGetFacilityInfo, getFacilityInfo)
    .post('/facilities', validatePostFacility, passport.authenticate('jwt-customer', {session: false}), postFacility)
    .delete('/facilities/:id',  validateDeleteFacility, passport.authenticate('jwt-manager', {session: false}), deleteFacility)

    .get('/resources/by_facility/:id', validateGetResources, passport.authenticate('jwt-customer', {session: false}), getResources)
    .post('/resources/by_facility/:id', validatePostResource, passport.authenticate('jwt-manager', {session: false}), postResource)
    .delete('/resources/by_facility/:id/:resource_id', validateDeleteResource, passport.authenticate('jwt-manager', {session: false}), deleteResource)

    .post('/auth/signup', validateSignUpUser, signUpUser)
    .post('/auth/login', validateLoginUser, loginUser)
    .post('/auth/invite', inviteUser)

    .get('/bookings/by_facility/:id', validateGetBookings, passport.authenticate('jwt-customer', {session: false}), getBookingsByFacility)
    .get('/bookings/by_user', passport.authenticate('jwt-customer', {session: false}), getBookingsByUser)
    .post('/bookings', validatePostBooking, passport.authenticate('jwt-customer', {session: false}), postBooking)
    .delete('/bookings/:id', validateDeleteBooking, passport.authenticate('jwt-customer', {session: false}), deleteBooking)


module.exports = router