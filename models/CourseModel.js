const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const CourseSchema = new Schema({
  courseName: {
    type: String,
    required: true
  },
  courseSection: {
    type: String,
    required: true
  },
  professorId: {
    type: String,
    required: true
  },
  studentIds: {
    type: [String],
    required: false
  },
  assignmentIds: {
    type: [String],
    required: false
  },
  chatroomIds: {
    type: [String],
    required: false
  },
  courseColor: {
    type: String,
    required: false
  }
});
module.exports = Course = mongoose.model("courses", CourseSchema);