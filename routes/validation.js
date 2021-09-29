const { check, param, validationResult } = require('express-validator')

// Function that validates and sends back response
const validationHandler = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    } else next();
}

const validateGetFacilitiesByUser = [
    param('id').isInt(), validationHandler
]

const validateGetFacilityInfo = [
    param('facilityId').isInt(), validationHandler
]

const validatePostFacility = [
    check('name').not().isEmpty(),
    check('description').not().isEmpty(),
    validationHandler
]

const validateDeleteFacility = [
    param('facilityId').isInt(),
    validationHandler
]

const validateGetResources = [
    param('facilityId').isInt(),
    validationHandler
]

const validateDeleteResource = [
    param('facilityId').not().isEmpty().isInt(),
    param('resourceId').not().isEmpty().isInt(),
    validationHandler
]

const validatePostResource = [
    param('facilityId').isInt(),
    check('name').not().isEmpty(),
    check('description').not().isEmpty(),
    validationHandler
]

const validateSignUpUser = [
    check('firstName').not().isEmpty().isLength({max: 100}),
    check('lastName').not().isEmpty().isLength({max: 100}),
    check('password').not().isEmpty().isLength({min: 6, max: 100}),
    check('email').not().isEmpty().isEmail().isLength({max: 100}),
    validationHandler
]

const validateLoginUser = [
    check('password').not().isEmpty().isLength({max: 100}),
    check('email').not().isEmpty().isEmail().isLength({max: 100}),
    validationHandler
]

const validateGetBookings = [
    param('facilityId').isInt(),
    validationHandler
]

const validatePostBooking = [
    check('resourceId').not().isEmpty().isInt(),
    check('organizerId').not().isEmpty().isInt(),
    check('startTime').not().isEmpty().isLength({max: 100}),
    check('endTime').not().isEmpty().isLength({max: 100}),
    validationHandler
]

const validateDeleteBooking = [
    param('bookingId').isInt(),
    validationHandler
]

const validateInvite = [
    param('facilityId').isInt(),
    check('email').not().isEmpty().isEmail(),
    validationHandler
]

const validateForgotPassword = [
    check('email').not().isEmpty().isEmail().isLength({max: 100}),
    validationHandler
]

const validateResetPassword = [
    check('password').not().isEmpty().isLength({min: 6, max: 100}),
    check('email').not().isEmpty().isEmail().isLength({max: 100}),
    check('token').not().isEmpty().isLength({max: 100}),
    validationHandler
]

const validateConfirmEmail = [
    check('email').not().isEmpty().isEmail().isLength({max: 100}),
    check('token').not().isEmpty().isLength({max: 100}),
]

const validateResendConfirmEmail = [
    check('email').not().isEmpty().isEmail().isLength({max: 100}),  
]

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
    validateResetPassword,
    validateConfirmEmail,
    validateResendConfirmEmail
}