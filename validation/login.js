const Joi = require('joi')

module.exports = Joi.object({
  email: Joi.string()
    .email()
    .max(64)
    .required()    
    .messages({
      'any.required': 'Email is required',
      'string.empty': 'Email is not allowed to be empty',
      'string.min': 'Email must be at most 64 characters',
      'string.email': 'Email must be a valid email',
    }),

  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is not allowed to be empty',
    })
})