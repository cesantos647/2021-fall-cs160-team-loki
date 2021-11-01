const Joi = require('joi')

module.exports = Joi.object({
  courseName: Joi.string().required().messages({
    'any.required': 'courseName is required'
  }),
  courseSection: Joi.string().required().messages({
    'any.required': 'courseSection is required'
  }),
  courseColor: Joi.string()
})