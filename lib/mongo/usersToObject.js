function userAllDataToObject(userObject) {
    let user = {}
    user.courseName = userObject.name
    user.email = userObject.email
    user.id = userObject.id
    user.courseIds = userObject.courseIds;
    user.chatIds = userObject.chatIds;
    return user
  }
  
  module.exports = {
    userAllDataToObject
  }