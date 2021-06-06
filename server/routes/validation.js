const { check, param, validationResult } = require('express-validator')

const validateGetFacilityInfo = [
    param('id').isInt(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else next();
    }]

const validateSignUpUser = [
    check('password').not().isEmpty().isLength({min: 6, max: 100}),
    check('email').not().isEmpty().isEmail().isLength({max: 100}),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else next();
    }]

const validateGetBookings = [
    param('id').isInt(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else next()
    }]

const validatePostBooking = [
    check('resources_id').not().isEmpty().isInt(),
    check('organizer_id').not().isEmpty().isInt(),
    check('start_time').not().isEmpty().isLength({max: 100}),
    check('end_time').not().isEmpty().isLength({max: 100}),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else next();
    }]

module.exports = {
    validateGetFacilityInfo,
    validateSignUpUser,
    validateGetBookings,
    validatePostBooking
}