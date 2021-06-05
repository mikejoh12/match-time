const { check, param, validationResult } = require('express-validator')

const validateGetFacilityInfo = [
    param('id').isInt(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
}]

const validateSignUpUser = []

const validateGetBookings = []

const validatePostBooking = []

module.exports = {
    validateGetFacilityInfo
}