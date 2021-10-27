function chatroomAllDataToObject(chatroomObject) {
    let chatroom = {}
    chatroom.chats = chatroomObject.chats;
    chatroom.users = chatroomObject.users;
    return chatroom;
}

module.exports = {
    chatroomAllDataToObject
}