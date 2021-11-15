function userAllDataToObject(userObject) {
    let user = {}
    user.courseName = userObject.name
    user.email = userObject.email
    user.id = userObject.id
    user.studentIds = userObject.studentIds;
    user.chatIds = userObject.chatIds;
    return user
  }
  
  module.exports = {
    userAllDataToObject
  }