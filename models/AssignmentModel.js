const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const AssignmentSchema = new Schema({
  assignmentName: {
    type: String,
    required: true
  },
  assignmentDescription: {
    type: String,
    required: false
  },
  professorId: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  openDate: {
    type: Date,
    default: new Date(),
    required: false
  },
  closeDate: {
    type: Date,
    required: false
  },
  totalPossiblePoints: {
    type: Number,
    required: true
  },
  studentPoints: {
    type: [{
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      points: {
        type: Number,
        required: true
      }
    }],
    required: false
  },
  assignmentSubmissions: {
    type: [{
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      submission: {
        type: String,
        required: true
      }
    }],
    required: false
  }
});
module.exports = Assignment = mongoose.model("assignments", AssignmentSchema);