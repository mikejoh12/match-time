const Router = require('express-promise-router')
const { getFacilityInfo, postFacility, getFacilites } = require('../controllers/facility-controller.js')
const { signUpUser } = require('../controllers/auth-controller.js')
const { getBookings, postBooking, deleteBooking } = require('../controllers/bookings-controller.js')
const { validateGetFacilityInfo, validatePostFacility, validateSignUpUser, validateGetBookings, validatePostBooking,
        validateDeleteBooking } = require('./validation')

const router = new Router()

router  
    .get('/facilities', getFacilites)
    .get('/facilities/:id', validateGetFacilityInfo, getFacilityInfo)
    .post('/facilities', validatePostFacility, postFacility)

    .post('/auth/signup', validateSignUpUser, signUpUser)

    .get('/bookings/by_facility/:id', validateGetBookings, getBookings)
    .post('/bookings', validatePostBooking, postBooking)
    .delete('/bookings/:id', validateDeleteBooking, deleteBooking)

module.exports = router