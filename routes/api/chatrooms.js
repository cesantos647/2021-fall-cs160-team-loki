const express = require("express");
const router = express.Router();
const Chatroom = require("../../models/Chatroom");

const validateChatRoomInput = require("../../validation/chatroomValidation");

const { chatroomAllDataToObject } = require("../../lib/mongo/chatroomsToObject");


//Create Chat Room
router.post("/chatroom", (req, res) => {
    const { data, error } = validateChatRoomInput.validate(req.body);

    if(error) return res.status(400).json({status: "failure", error: error.details[0].message});

    const newChatRoom = new Chatroom(req.body);
    return newChatRoom.save()
        .then(chatRoom => res.status(200).json({ status: "success", data: { chatRoomId: chatRoom._id.toString() } }))
        .catch(err => res.status(400).json({status: "failure", error: err.details[0].message}));
});

//Get Chat Room Details
router.get("/:chatroomId", (req, res) => {
    if(!req.params.chatroomId) return res.status(400).json({status: "failure", error: "missing chatroomId"});
    return Chatroom.findOne({_id: req.params.chatroomId})
        .then(chatRoom => {
            return res.status(200).json({status: "success", data: {chatRoom: chatroomAllDataToObject(chatRoom)}})
        })
        .catch(() => res.status(404).json({status: "failure", error: "Chat room not found"}));
});

//Add Chat To Chat Room
//assumes both chat and chatroom are valid, will need to update later on
router.post("/:chatroomId/:chatId", (req, res) => {
    if(!req.params.chatId || !req.params.chatRoomId) return res.status(400).json({status: "failure", error: "Missing chatId or chatroomId"});

    return Chatroom.findOneAndUpdate({_id: req.params.chatroomId}, {$push: {chats: req.params.chatId}})
        .then(chatRoom => {
            return res.status(200).json({status: "success", data: {chatRoom: chatroomAllDataToObject(chatRoom)}})
        })
        .catch(() => res.status(404).json({status: "failure", error: "Chat room not found"}));

});

module.exports = router