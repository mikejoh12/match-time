const { check, param, validationResult } = require('express-validator')

const validateGetFacilitiesByUser = [
    param('id').isInt(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else next();
    }]

const validateGetFacilityInfo = [
    param('facilityId').isInt(),
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

const validateDeleteFacility = [
    param('facilityId').isInt(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else next();
    }]

const validateGetResources = [
    param('facilityId').isInt(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else next();
    }]

const validateDeleteResource = [
    param('facilityId').not().isEmpty().isInt(),
    param('resourceId').not().isEmpty().isInt(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else next();
    }]

const validatePostResource = [
    param('facilityId').isInt(),
    check('name').not().isEmpty(),
    check('description').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else next();
    }]

const validateSignUpUser = [
    check('firstName').not().isEmpty().isLength({max: 100}),
    check('lastName').not().isEmpty().isLength({max: 100}),
    check('password').not().isEmpty().isLength({min: 6, max: 100}),
    check('email').not().isEmpty().isEmail().isLength({max: 100}),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else next();
    }]

const validateLoginUser = [
    check('password').not().isEmpty().isLength({max: 100}),
    check('email').not().isEmpty().isEmail().isLength({max: 100}),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else next();
    }]

const validateGetBookings = [
    param('facilityId').isInt(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else next()
    }]

const validatePostBooking = [
    check('resourceId').not().isEmpty().isInt(),
    check('organizerId').not().isEmpty().isInt(),
    check('startTime').not().isEmpty().isLength({max: 100}),
    check('endTime').not().isEmpty().isLength({max: 100}),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else next();
    }]

const validateDeleteBooking = [
    param('bookingId').isInt(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else next()
    }]

const validateInvite = [
    param('facilityId').isInt(),
    check('email').not().isEmpty().isEmail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else next();
    }]

    const validateForgotPassword = [
        check('email').not().isEmpty().isEmail().isLength({max: 100}),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() })
            } else next();
        }]

    const validateResetPassword = [
        check('password').not().isEmpty().isLength({min: 6, max: 100}),
        check('email').not().isEmpty().isEmail().isLength({max: 100}),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() })
            } else next();
        }]

module.exports = {
    validateGetFacilitiesByUser,
    validateGetFacilityInfo,
    validatePostFacility,
    validateDeleteFacility,
    validateGetResources,
    validateDeleteResource,
    validatePostResource,
    validateSignUpUser,
    validateLoginUser,
    validateGetBookings,
    validatePostBooking,
    validateDeleteBooking,
    validateForgotPassword,
    validateResetPassword
}