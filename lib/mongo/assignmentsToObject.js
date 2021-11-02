function assignmentAllDataToObject(assignmentObject) {
  let assignment = {}
  assignment.assignmentName = assignmentObject.assignmentName
  assignment.assigmentDescription = assignmentObject.assigmentDescription
  assignment.professorId = assignmentObject.professorId
  assignment.dueDate = assignmentObject.dueDate
  assignment.openDate = assignmentObject.openDate
  assignment.closeDate = assignmentObject.closeDate
  assignment.totalPossiblePoints = assignmentObject.totalPossiblePoints
  assignment.studentPoints = assignmentObject.studentPoints
  assignment.assignmentSubmissions = assignmentObject.assignmentSubmissions
  return assignment
}

module.exports = {
  assignmentAllDataToObject
}