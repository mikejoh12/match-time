const { check, param, validationResult } = require('express-validator')

const validateGetFacilityInfo = [
    param('id').isInt(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else next();
    }]

const validatePostFacility = [
    check('name').not().isEmpty(),
    check('description').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else next();
    }]

const validateGetResources = [
    param('id').isInt(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else next();
    }]

const validateDeleteResource = [
    param('id').not().isEmpty().isInt(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else next();
    }]

const validatePostResource = [
    check('facilities_id').not().isEmpty().isInt(),
    check('name').not().isEmpty(),
    check('description').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
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

const validateDeleteBooking = [
    param('id').isInt(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else next()
    }]

module.exports = {
    validateGetFacilityInfo,
    validatePostFacility,
    validateGetResources,
    validateDeleteResource,
    validatePostResource,
    validateSignUpUser,
    validateGetBookings,
    validatePostBooking,
    validateDeleteBooking
}