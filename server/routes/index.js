const Router = require('express-promise-router')
const { getFacilityInfo } = require('../controllers/facility-controller.js')
const { signUpUser } = require('../controllers/auth-controller.js')
const { getBookings, postBooking, deleteBooking } = require('../controllers/bookings-controller.js')
const { validateGetFacilityInfo, validateSignUpUser, validateGetBookings, validatePostBooking,
        validateDeleteBooking } = require('./validation')

const router = new Router()

router  
    .get('/facilities/:id', validateGetFacilityInfo, getFacilityInfo)

    .post('/auth/signup', validateSignUpUser, signUpUser)

    .get('/bookings/by_facility/:id', validateGetBookings, getBookings)
    .post('/bookings', validatePostBooking, postBooking)
    .delete('/bookings/:id', validateDeleteBooking, deleteBooking)

module.exports = router