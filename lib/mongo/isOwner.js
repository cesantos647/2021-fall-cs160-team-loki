
/*
  model: Mongo Model for the collection that will be searched
  objectId: ObjectId of the object that is searched for as a string
  ownerId: id of owner of the object as a string
  ownerPropertyName: name of property holding the owner id in the
    object as a string
*/

async function isOwner(model, objectId, ownerId, ownerPropertyName) {
  return await model.findOne({ _id: objectId })
    .then(object => {
      if(object[ownerPropertyName] == ownerId) return true
      return false
    })
    .catch(() => false)
}

module.exports = isOwner;