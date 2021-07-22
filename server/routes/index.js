const passport = require('passport')
const Router = require('express-promise-router')

const { getFacilityInfo, postFacility, getFacilitesByUser, deleteFacility } = require('../controllers/facilities-controller.js')
const { signUpUser, loginUser } = require('../controllers/auth-controller.js')
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
    .post('/facilities', passport.authenticate('jwt-customer', {session: false}), validatePostFacility, postFacility)
    .delete('/facilities/:id', passport.authenticate('jwt-customer', {session: false}), validateDeleteFacility, deleteFacility)

    .get('/resources/by_facility/:id', passport.authenticate('jwt-customer', {session: false}), validateGetResources, getResources)
    .post('/resources', passport.authenticate('jwt-customer', {session: false}), validatePostResource, postResource)
    .delete('/resources/:id', passport.authenticate('jwt-customer', {session: false}), validateDeleteResource, deleteResource)

    .post('/auth/signup', validateSignUpUser, signUpUser)
    .post('/auth/login', validateLoginUser, loginUser)

    .get('/bookings/by_facility/:id', passport.authenticate('jwt-customer', {session: false}), validateGetBookings, getBookingsByFacility)
    .get('/bookings/by_user', passport.authenticate('jwt-customer', {session: false}), getBookingsByUser)
    .post('/bookings', passport.authenticate('jwt-customer', {session: false}), validatePostBooking, postBooking)
    .delete('/bookings/:id', passport.authenticate('jwt-customer', {session: false}), validateDeleteBooking, deleteBooking)


module.exports = router