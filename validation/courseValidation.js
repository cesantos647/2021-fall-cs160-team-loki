const Joi = require('joi')

module.exports = Joi.object({
  courseName: Joi.string().required().messages({
    'any.required': 'courseName is required'
  }),
  courseSection: Joi.string().required().messages({
    'any.required': 'courseSection is required'
  }),
  professorId: Joi.string().required().messages({
    'any.required': 'professorId is required'
  }),
  courseColor: Joi.string()
})