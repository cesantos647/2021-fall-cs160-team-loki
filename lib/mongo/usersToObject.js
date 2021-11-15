function userAllDataToObject(userObject) {
    let user = {}
    user.courseName = userObject.name
    user.email = userObject.email
    user.id = userObject.id
    user.courseIDs = userObject.courseIDs;
    user.chatIDs = userObject.chatIDs;
    return user
  }
  
  module.exports = {
    userAllDataToObject
  }