const express = require("express");
const router = express.Router();
const passport = require('passport')

require('../../config/passport')

const Assignment = require("../../models/AssignmentModel");
const Course = require("../../models/CourseModel");

const validateAssignmentInput = require('../../validation/assignmentValidation');

const { assignmentAllDataToObject } = require('../../lib/mongo/assignmentsToObject');
const isOwner = require('../../lib/mongo/isOwner')

router.get('/:assignmentId', (req, res) => {
  
  if(!req.params.assignmentId) return res.status(400).json({ status: "failure", error: "missing assignmentId" })

  return Assignment.findOne({ _id: req.params.assignmentId })
    .then(assignment => {
      return res.status(200).json({ status: "success", data: assignmentAllDataToObject(assignment) })
    })
    .catch(() => res.status(404).json({ status: "failure", error: "assignment not found" }))
});

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  if(!req.user._id) res.status(401).send("Unauthorized")

  const { data, error } = validateAssignmentInput.validate(req.body);

  if(error) return res.status(400).json({ status: "failure", error: error.details[0].message });

  if(!req.body.closeDate) req.body.closeDate = req.body.dueDate;
  req.body.professorId = req.user._id.toString()
  const newAssignment = new Assignment(req.body);
  return newAssignment.save()
    .then(assignment => res.status(200).json({ status: "success", data: { assignmentId: assignment._id.toString() } }))
    .catch(() => res.status(400).json({ status: "failure", error: "failed to create assignment" }));
});

router.put('/:assignmentId', passport.authenticate('jwt', {session: false}), async (req, res) => {

  if(!req.user._id) return res.status(401).send("Unauthorized")

  if(!req.params.assignmentId) return res.status(400).json({ status: "failure", error: "missing assignmentId" })

  
  if(!await isOwner(Assignment, req.params.assignmentId, req.user._id.toString(), "professorId")){
    return res.status(401).send("Unauthorized")
  } 
  
  const { data, error } = validateAssignmentInput.validate(req.body);

  if(error) return res.status(400).json({ status: "failure", error: error.details[0].message });

  return Assignment.findByIdAndUpdate({ _id: req.params.assignmentId }, req.body, {new: true})
    .then(assignment => res.status(200).json({ status: "success", data: assignmentAllDataToObject(assignment) }))
    .catch(() => res.status(404).json({ status: "failure", error: "assignment not found" }));
});

router.delete("/:assignmentId", passport.authenticate('jwt', {session: false}), async (req, res) => {

  if(!req.user._id) res.status(401).send("Unauthorized")

  if(!req.params.assignmentId) return res.status(400).json({ status: "failure", error: "missing assignmentId" })

  if(!await isOwner(Assignment, req.params.assignmentId, req.user._id.toString(), "professorId")){
    return res.status(401).send("Unauthorized")
  }

  return Assignment.deleteOne({ _id: req.params.assignmentId })
    .then(() => {
      return res.status(200).json({ status: "success" })
    })
    .catch(() => res.status(404).json({ status: "failure", error: "assignment not found" }))
});

router.post('/:courseId', passport.authenticate('jwt', {session: false}), async (req, res) => {

  if(!req.params.courseId) return res.status(400).json({ status: "failure", error: "missing assignmentId" })

  const { data, error } = validateAssignmentInput.validate(req.body);

  if(error) return res.status(400).json({ status: "failure", error: error.details[0].message });

  if(!req.body.closeDate) req.body.closeDate = req.body.dueDate;
  req.body.professorId = req.user._id.toString()
  const newAssignment = new Assignment(req.body);
  let assignment = await newAssignment.save()
    .then(assignment => assignment)
    .catch(() => undefined);
  
  if(!assignment) return res.status(400).json({ status: "failure", error: "failed to create assignment" });

  return Course.findByIdAndUpdate({ _id: req.params.courseId }, { $push: {assignmentIds: assignment._id.toString() }}, {new: true})
    .then(() => res.status(200).json({ status: "success", data: assignment._id.toString() }))
    .catch(async () => {
      await Assignment.deleteOne({ _id: assignment._id.toString() })
      return res.status(404).json({ status: "failure", error: "course not found" })
    })
});

module.exports = router;