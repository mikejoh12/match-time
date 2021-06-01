import Router from 'express-promise-router'

export const router = Router()

router.get('/bookings/1', (req, res) =>
    res.send('Here are the bookings: booking1, booking2..'))
