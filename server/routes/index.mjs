import Router from 'express-promise-router'

export const router = Router()

router.get('/facilities/1', (req, res) =>
    res.json({
        facilities_id: 1,
        name: 'Smash Tennis Club',
        description: 'A private tennis club with well maintened indoor courts, hard courts, clay courts, and padel courts. '
    }))

router.get('/bookings/1', (req, res) =>
    res.send('Here are the bookings: booking1, booking2..'))
