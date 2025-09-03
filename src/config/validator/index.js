const { body, param } = require('express-validator')

exports.checkParamId = [
    param('id', 'The id parameter is missing')
]
exports.CreatePushNotifications = [
    body('phoneNumber', 'The phoneNumber parameter is missing ').isNumeric(),
    body('pushToken', 'The pushToken parameter is missing ').isString(),
]

exports.SendPushNotifications = [
    body('title', 'The title parameter is missing ').isString({min: 2}),
    body('message', 'The body parameter is missing ').isString({min: 2}),
    body('listPushTokens', 'The listPushTokens parameter is missing  and cannot be empty').isArray().notEmpty(),
    
]