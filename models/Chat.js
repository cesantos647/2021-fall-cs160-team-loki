const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ChatSchema = new Schema({
    messages: {
        type: [String],
        required: false
    },
    users: {
        type: [String],
        required: true
    }
});

//unsure what to put as stirng for "chats"
module.exports = Chat = mongoose.model("chats", ChatSchema);