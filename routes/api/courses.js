const express = require("express");
const router = express.Router();
const Course = require("../../models/CourseModel")

const validateCourseInput = require("../../validation/courseValidation");

const { courseToObject } = require("../../lib/mongoToObject")

router.get("/:courseId", (req, res) => {
  if(!req.params.courseId) return res.status(400).json({ status: "failure", error: "missing courseId" })
  
  return Course.findOne({ _id: req.params.courseId })
    .then(course => {
      return res.status(200).json({ status: "success", data: { course: courseToObject(course) } })
    })
    .catch(() => res.status(400).json({ status: "failure", error: "course not found" }))
  
})

router.post("/", (req, res) => {
  const { data, error } = validateCourseInput.validate(req.body);

  if(error) return res.status(400).json({ status: "failure", error: err.details[0].message })

  const newCourse = new Course(req.body)
  return newCourse.save()
    .then(course => res.status(200).json({ status: "success", data: { courseId: course._id.toString() } }))
    .catch(err => res.status(400).json({ status: "failure", error: err.details[0].message }));
});

router.put("/:courseId", (req, res) => {
  if(!req.params.courseId) return res.status(400).json({ status: "failure", error: "missing courseId" })
  
  const { data, error } = validateCourseInput.validate(req.body);

  if(error) return res.status(400).json({ status: "failure", error: err.details[0].message })

  return Course.findByIdAndUpdate({ _id: req.params.courseId }, req.body, {new: true})
    .then(course => {
      return res.status(200).json({ status: "success", data: { course: courseToObject(course) } })
    })
    .catch(() => res.status(400).json({ status: "failure", error: "course not found" }))
  
})

router.delete("/:courseId", (req, res) => {
  if(!req.params.courseId) return res.status(400).json({ status: "failure", error: "missing courseId" })

  return Course.deleteOne({ _id: req.params.courseId })
    .then(() => {
      return res.status(200).json({ status: "success" })
    })
    .catch(() => res.status(400).json({ status: "failure", error: "course not found" }))
})

module.exports = router