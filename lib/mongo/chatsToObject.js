function chatAllDataToObject(chatObject) {
    let chat = {}
    chat.messages = chatObject.messages;
    chat.users = chatObject.users;
    return chat;
}

module.exports = {
    chatAllDataToObject
}