const Joi = require('joi')

module.exports = Joi.object({
  name: Joi.string()
    .min(5)
    .max(30)
    .required()
    .pattern(/^([a-zA-z\s]{5,30})$/, 'name')
    .messages({
      'any.required': 'Name is required',
      'string.pattern.name': 'Name must not contain punctuation or numbers',
      'string.empty': 'Name is not allowed to be empty',
      'string.min': 'Name must be at least 5 characters and at most 30 characters',
      'string.max': 'Name must be at least 5 characters and at most 30 characters'
    }),

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
    .min(6)
    .max(30)
    .required()
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is not allowed to be empty',
      'string.min': 'Password must be at least 6 characters and at most 30 characters',
      'string.max': 'Password must be at least 6 characters and at most 30 characters'
    }),
  
  password2: Joi.string()
    .equal(Joi.ref('password'))
    .required()
    .messages({
      'any.required': 'Password2 is required',
      'any.only': 'Password2 must be the same as password',
      'string.empty': 'Password2 is not allowed to be empty'
    })
})