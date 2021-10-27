const express = require("express");
const router = express.Router();
const Course = require("../../models/Chat")

const validateChatInput = require("../../validation/chatValidation");

const { chatAllDataToObject } = require("../../lib/mongo/chatsToObject");

//Create Chat
router.post("api/v1/chat/create/chat/new", (req, res) => {
    const { data, error } = validateChatInput.validate(req.body);

    if(error) return res.status(400).json({status: "failure", error: err.details[0].message});

    const newChat = new Chat(req.body);
    return newChat.save()
        .then(chat => res.status(200).json({ status: "success", data: { chatId: chat._id.toString() } }))
        .catch(err => res.status(400).json({status: "failure", error: err.details[0].message}));
});

//Get Chat Details
router.get("api/v1/chat/get/chat/:chatId", (req, res) => {
    if(!req.params.chatId) return res.status(400).json({status: "failure", error: "missing chatId"});
    return Chat.findOne({_id: req.params.chatId})
        .then(chat => {
            return res.status(200).json({status: "success", data: {chat: chatAllDataToObject(chat)}})
        })
        .catch(() => res.status(404).json({status: "failure", error: "Chat not found"}));
});

//Future tickets

//Send Message
router.get("api/v1/chat/update/chat/addmessage/:chatId", (req, res) => {

});

//Delete Message

router.get("api/v1/chat/update/chat/delmessage/:chatId", (req, res) => {

});