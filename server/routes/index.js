const Router = require('express-promise-router')
const { getFacilityInfo, postFacility, getFacilites, deleteFacility } = require('../controllers/facilities-controller.js')
const { signUpUser } = require('../controllers/auth-controller.js')
const { getBookingsByFacility, getBookingsByUser, postBooking, deleteBooking } = require('../controllers/bookings-controller.js')
const { validateGetFacilityInfo, validatePostFacility, validateGetResources, validateSignUpUser, validateGetBookings, validatePostBooking,
        validateDeleteBooking, 
        validatePostResource,
        validateDeleteResource} = require('./validation')
const { getResources, postResource, deleteResource } = require('../controllers/resources-controller.js')

const router = new Router()

router  
    .get('/facilities', getFacilites)
    .get('/facilities/:id', validateGetFacilityInfo, getFacilityInfo)
    .post('/facilities', validatePostFacility, postFacility)
    .delete('/facilities/:id', deleteFacility)

    .get('/resources/by_facility/:id', validateGetResources, getResources)
    .post('/resources', validatePostResource, postResource)
    .delete('/resources/:id', validateDeleteResource, deleteResource)

    .post('/auth/signup', validateSignUpUser, signUpUser)

    .get('/bookings/by_facility/:id', validateGetBookings, getBookingsByFacility)
    .get('/bookings/by_user/:id', validateGetBookings, getBookingsByUser)
    .post('/bookings', validatePostBooking, postBooking)
    .delete('/bookings/:id', validateDeleteBooking, deleteBooking)

module.exports = router