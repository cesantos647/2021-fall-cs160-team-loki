const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const MessageSchema = new Schema({
    sentBy: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: new Date(),
        required: true
    }
});

module.exports = Message = mongoose.model("messages", MessageSchema);