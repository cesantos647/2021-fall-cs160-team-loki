const Joi = require('joi')

module.exports = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(5)
    .max(30)
    .required()
    .messages({
      'any.required': 'name is required',
      'string.alphanum': 'name must only contain letters and numbers',
      'string.min': 'name must be at least 5 characters and at most 30 characters',
      'string.max': 'name must be at least 5 characters and at most 30 characters'
    }),

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
    .min(6)
    .max(30)
    .required()
    .messages({
      'any.required': 'password is required',
      'string.min': 'password must be at least 6 characters and at most 30 characters',
      'string.max': 'password must be at least 6 characters and at most 30 characters'
    }),
  
  password2: Joi.string()
    .equal(Joi.ref('password'))
    .required()
    .messages({
      'any.required': 'password2 is required',
      'any.only': 'password2 must be the same as password'
    })
})