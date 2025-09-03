const { validationResult  } = require('express-validator') 
exports.validatorError = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({
            type: 'error',
            message: 'Bad Request!',
            errors: errors.array() }
            )
    }
    next()
}