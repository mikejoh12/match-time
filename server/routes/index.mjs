import Router from 'express-promise-router'
import { getFacilityInfo } from '../controllers/facility-controller.mjs'

export const router = Router()

router.get('/facilities/:id', getFacilityInfo)

router.get('/bookings/1', (req, res) =>
    res.send('Here are the bookings: booking1, booking2..'))
