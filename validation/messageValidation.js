const Joi = require('joi')

module.exports = Joi.object({
    sentBy: Joi.string().required().messages({
        'any.required': 'sentBy ID is required'
    }),
    message: Joi.string().required().messages({
        'any.required': 'message is required'
    }),
    timeStamp: Joi.alternatives([
        Joi.date(), 
        Joi.string()
      ]).required().messages({
        'any.required': 'timeStamp is required'
      })
})