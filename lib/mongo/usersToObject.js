function userAllDataToObject(userObject) {
    let user = {}
    user.courseName = userObject.name
    user.email = userObject.email
    user.id = userObject.id
    return user
  }
  
  module.exports = {
    userAllDataToObject
  }