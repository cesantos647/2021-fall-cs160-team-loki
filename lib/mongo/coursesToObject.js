function courseAllDataToObject(courseObject) {
  let course = {}
  course.courseName = courseObject.courseName
  course.courseSection = courseObject.courseSection
  course.professorId = courseObject.professorId
  course.studentIds = courseObject.studentIds
  course.assignmentIds = courseObject.assignmentIds
  course.chatroomIds = courseObject.chatroomIds
  course.courseColor = courseObject.courseColor
  return course
}

module.exports = {
  courseAllDataToObject
}