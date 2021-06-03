const Router = require('express-promise-router')
const { getFacilityInfo } = require('../controllers/facility-controller.js')
const { signUpUser } = require('../controllers/auth-controller.js')
const { getBookings } = require('../controllers/bookings-controller.js')

const router = new Router()

router  
    .get('/facilities/:id', getFacilityInfo)

    .post('/auth/signup', signUpUser)

    .get('/bookings/by_facility/:id', getBookings)

module.exports = router