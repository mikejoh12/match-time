import Router from 'express-promise-router'

export const router = Router()

router.get('/bookings', (req, res) =>
    res.send('Here are the bookings: booking1, booking2..'))
