const Joi = require('joi')

module.exports = Joi.object({
    messages: Joi.array(),
    users: Joi.array.required().messages({
      'any.required': 'users is required'
    }),
  })