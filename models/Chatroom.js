const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ChatroomSchema = new Schema({
    chats: {
        type: [String],
        required: false
    },
    users: {
        type: [String],
        required: true
    }
});

//unsure what to put as stirng for "chatroom"
module.exports = Chatroom = mongoose.model("chatroom", ChatroomSchema);