const Joi = require('joi')

module.exports = Joi.object({
  email: Joi.string()
    .email()
    .max(64)
    .required()    
    .messages({
      'any.required': 'email is required',
      'string.min': 'email must be at most 64 characters',
      'string.email': 'email must be a valid email',
    }),

  password: Joi.string()
    .required()
    .messages({
      'any.required': 'password is required',
    })
})