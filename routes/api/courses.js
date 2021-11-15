const express = require("express");
const router = express.Router();
const passport = require('passport')
const Course = require("../../models/CourseModel")
const User = require("../../models/User")

require('../../config/passport')

const validateCourseInput = require("../../validation/courseValidation");

const { courseAllDataToObject } = require("../../lib/mongo/coursesToObject")
const isOwner = require('../../lib/mongo/isOwner')

router.get("/:courseId", (req, res) => {
  
  if(!req.params.courseId) return res.status(400).json({ status: "failure", error: "missing courseId" })
  
  return Course.findOne({ _id: req.params.courseId })
    .then(course => {
      return res.status(200).json({ status: "success", data: courseAllDataToObject(course) })
    })
    .catch(() => res.status(404).json({ status: "failure", error: "course not found" }))
  
})

router.post("/", passport.authenticate('jwt', {session: false}), (req, res) => {
  
  if(!req.user._id) res.status(401).send("Unauthorized")

  const { data, error } = validateCourseInput.validate(req.body);

  if(error) return res.status(400).json({ status: "failure", error: error.details[0].message })

  req.body.professorId = req.user._id.toString()
  const newCourse = new Course(req.body)
  return newCourse.save()
    .then(course => res.status(200).json({ status: "success", data: { courseId: course._id.toString() } }))
    .catch(() => res.status(400).json({ status: "failure", error: "failed to create course" }));
});

router.put("/:courseId", passport.authenticate('jwt', {session: false}), async (req, res) => {
  
  if(!req.user._id) res.status(401).send("Unauthorized")

  if(!req.params.courseId) return res.status(400).json({ status: "failure", error: "missing courseId" })
  
  if(!await isOwner(Course, req.params.courseId, req.user._id.toString(), "professorId")){
    return res.status(401).send("Unauthorized")
  }
  
  const { data, error } = validateCourseInput.validate(req.body);

  if(error) return res.status(400).json({ status: "failure", error: error.details[0].message })

  return Course.findByIdAndUpdate({ _id: req.params.courseId }, req.body, {new: true})
    .then(course => {
      return res.status(200).json({ status: "success", data: courseAllDataToObject(course) })
    })
    .catch(() => res.status(404).json({ status: "failure", error: "course not found" }))
  
});

router.delete("/:courseId", passport.authenticate('jwt', {session: false}), async (req, res) => {
  
  if(!req.user._id) res.status(401).send("Unauthorized")
  
  if(!req.params.courseId) return res.status(400).json({ status: "failure", error: "missing courseId" })

  if(!await isOwner(Course, req.params.courseId, req.user._id.toString(), "professorId")){
    return res.status(401).send("Unauthorized")
  }

  return Course.deleteOne({ _id: req.params.courseId })
    .then(() => {
      return res.status(200).json({ status: "success" })
    })
    .catch(() => res.status(404).json({ status: "failure", error: "course not found" }))
});

// Add a student to a course with student ID
router.put("/:courseId/:studentId", passport.authenticate('jwt', {session: false}), async (req, res) => {

  if(!req.user._id) res.status(401).send("Unauthorized")

  if(!req.params.courseId) return res.status(400).json({ status: "failure", error: "missing courseId" })
  if(!req.params.studentId) return res.status(400).json({ status: "failure", error: "missing studentId" })
  
  if(!await isOwner(Course, req.params.courseId, req.user._id.toString(), "professorId")){
    return res.status(401).send("Unauthorized")
  }
  
  const studentId = req.params.studentId;
  const courseId = req.params.courseId;

  return await User.findById(studentId, (err, student)=> {   // Check if student exists
    if (!student) {
      return res.status(404).json({ 
        status: "failure", 
        error: "student not found" 
      })
    } else {
      return Course.findById(courseId, (err, updatedStudent)=> {  // Add studentID to list of studentIDs in course
        updatedStudent.studentIds.push(studentId);
        updatedStudent.save()
        res.status(200).json({
          status: "success", 
          data: courseAllDataToObject(updatedStudent)
        })
      })
    }
  })
  
});

// Remove a student from a course
router.put("/:courseId/delete/:studentId", passport.authenticate('jwt', {session: false}), async (req, res) => {

  if(!req.user._id) res.status(401).send("Unauthorized")
  
  if(!req.params.courseId) return res.status(400).json({ status: "failure", error: "missing courseId" })
  if(!req.params.studentId) return res.status(400).json({ status: "failure", error: "missing studentId" })
  
  if(!await isOwner(Course, req.params.courseId, req.user._id.toString(), "professorId")){
    return res.status(401).send("Unauthorized")
  }
  
  const studentId = req.params.studentId;
  const courseId = req.params.courseId;

  return await User.findById(studentId, (err, student)=> {   // Check if student exists
    if (!student) {
      return res.status(404).json({ 
        status: "failure", 
        error: "student not found" 
      });
    } else {
      Course.findByIdAndUpdate( {courseId}, {$pull : { 'studentIds': studentId } });
    }
  });
});

module.exports = router