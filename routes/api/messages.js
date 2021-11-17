const express = require("express");
const router = express.Router();
const Message = require("../../models/Message");
const Chat = require("../../models/Chat");

const validateMessageInput = require("../../validation/messageValidation");

const { messageAllDataToObject } = require("../../lib/mongo/messagesToObject");
const { chatAllDataToObject } = require("../../lib/mongo/chatsToObject");

//Create Message
router.post("/:chatId", (req, res) => {
    if(!req.params.chatId) return res.status(400).json({status: "failure", error: "missing chatId"});
    const {data, error} = validateMessageInput.validate(req.body);

    if(error) return res.status(400).json({status: "failure", error: error.details[0].message});

    const newMessage = new Message(req.body);

    return newMessage.save()
        .then(message => res.status(200).json({ status: "success", data: { messageId: message._id.toString() } }))
        .catch(err => res.status(400).json({status: "failure", error: err.details[0].message}));
})
//Add Message to Chat
//assumes both message and chat are valid, will need to update later on
router.post("/:chatId/:messageId", (req, res) => {
    if(!req.params.chatId || !req.params.messageId) return res.status(400).json({status: "failure", error: "Missing chatId or messageId"});

    return Chat.findOneAndUpdate({_id: req.params.chatId}, {$push: {messages: req.params.messageId}})
        .then(chat => {
            return res.status(200).json({status: "success", data: {chat: chatAllDataToObject(chat)}})
        })
        .catch(() => res.status(404).json({status: "failure", error: "Chat not found"}));

});

//Delete Message
router.delete("/:messageId", (req, res) => {
    if(!req.params.messageId) return res.status(400).json({ status: "failure", error: "missing messageId" })
  
    return Message.deleteOne({ _id: req.params.messageId })
      .then(() => {
        return res.status(200).json({ status: "success" })
      })
      .catch(() => res.status(404).json({ status: "failure", error: "message not found" }))
  })

//Get Message
router.get("/:messageId", (req, res) => {
    if(!req.params.messageId) return res.status(400).json({status: "failure", error: "missing messageId"});
    return Message.findOne({_id: req.params.messageId})
        .then(message => {
            return res.status(200).json({status: "success", data: {chat: messageAllDataToObject(message)}})
        })
        .catch(() => res.status(404).json({status: "failure", error: "Message not found"}));
});

module.exports = router;