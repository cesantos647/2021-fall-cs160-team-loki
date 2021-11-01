const Joi = require('joi')

module.exports = Joi.object({
    users: Joi.array().required().messages({
        'any.required': 'users is required'
    }),
    chats: Joi.array()
  })