function messageToObject(messageObject) {
    let message = {};
    message.sentBy = messageObject.sentBy;
    message.message = messageObject.message;
    message.timeStamp = message.timeStamp;
    return message;
}

module.exports = {
    messagesToObject
}