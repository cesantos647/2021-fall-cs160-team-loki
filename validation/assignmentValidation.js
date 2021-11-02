const Joi = require('joi')

module.exports = Joi.object({
  assignmentName: Joi.string().required().messages({
    'string.empty': 'Email is not allowed to be empty',
    'any.required': 'assignmentName is required'
  }),
  assigmentDescription: Joi.string(),
  dueDate: Joi.alternatives([
    Joi.date(), 
    Joi.string()
  ]).required().messages({
    'any.required': 'dueDate is required'
  }),
  openDate: Joi.alternatives([
    Joi.date(), 
    Joi.string()
  ]),
  closeDate: Joi.alternatives([
    Joi.date(), 
    Joi.string()
  ]),
  totalPossiblePoints: Joi.number().min(0).required().messages({
    'number.min': 'totalPossiblePoints must be non-negative',
    'any.required': 'totalPossiblePoints is required'
  }),
  studentPoints: Joi.array().items(Joi.object({
    id: Joi.string().required().messages({
      'string.empty': 'studentId must not be empty',
      'any.required': 'studentPoints.id is required'
    }),
    points: Joi.number().min(0).required().messages({
      'number.min': 'studentPoints.points must be non-negative',
      'any.required': 'studentPoints.points is required'
    }),
  })),
  assignmentSubmissions: Joi.array().items(Joi.object({
    id: Joi.string().required().messages({
      'string.empty': 'studentId must not be empty',
      'any.required': 'studentPoints.id is required'
    }),
    submission: Joi.string().required().messages({
      'string.empty': 'assignmentSubmissions.submission must not be empty',
      'any.required': 'assignmentSubmissions.submission is required'
    }),
  }))
})