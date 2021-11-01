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


module.exports = Chat = mongoose.model("chats", ChatSchema);