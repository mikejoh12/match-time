const passport = require('passport')
const Router = require('express-promise-router')

const { getFacilityInfo, postFacility, getFacilitesByUser, deleteFacility } = require('../controllers/facilities-controller.js')
const { signUpUser, loginUser } = require('../controllers/auth-controller.js')
const { getBookingsByFacility, getBookingsByUser, postBooking, deleteBooking } = require('../controllers/bookings-controller.js')
const { validateGetFacilitiesByUser,
        validateGetFacilityInfo,
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
    .get('/facilities/by_user/:id', validateGetFacilitiesByUser, getFacilitesByUser)
    .get('/facilities/:id', validateGetFacilityInfo, getFacilityInfo)
    .post('/facilities', validatePostFacility, postFacility)
    .delete('/facilities/:id', validateDeleteFacility, deleteFacility)

    .get('/resources/by_facility/:id', validateGetResources, getResources)
    .post('/resources', validatePostResource, postResource)
    .delete('/resources/:id', validateDeleteResource, deleteResource)

    .post('/auth/signup', validateSignUpUser, signUpUser)
    .post('/auth/login', validateLoginUser, loginUser)

    .get('/bookings/by_facility/:id', validateGetBookings, getBookingsByFacility)
    .get('/bookings/by_user/:id', validateGetBookings, getBookingsByUser)
    .post('/bookings', validatePostBooking, postBooking)
    .delete('/bookings/:id', validateDeleteBooking, deleteBooking)

module.exports = router