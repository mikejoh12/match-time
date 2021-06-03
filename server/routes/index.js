const Router = require('express-promise-router')
const { getFacilityInfo } = require('../controllers/facility-controller.js')
const { signUpUser } = require('../controllers/auth-controller.js')

const router = new Router()

router  
    .get('/facilities/:id', getFacilityInfo)

    .post('/auth/signup', signUpUser)

    .get('/bookings/1', (req, res) => {
        res.send('Here are the bookings: booking1, booking2..')
    })

module.exports = router