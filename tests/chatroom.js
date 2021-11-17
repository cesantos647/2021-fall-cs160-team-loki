const request = require("supertest");
const app = require("../server");
const User = require("../models/User");
const Chatroom = require("../models/Chatroom");
const jwtDecode = require('jwt-decode');

var userId;
var testChatIds = ["chatId1", "chatId2"];
var testUserIds = ["userId1", "userId2"];

beforeAll(async () => {
  await request(app)
    .post("/api/users/register")
    .send({ 
      name: "testingUser",
      email: "chatroom@test.com",
      password: "testingUser",
      password2: "testingUser"
    })
    .then(response => {
      expect(response.statusCode).toBe(200);
    });
  await request(app)
    .post("/api/users/login")
    .send({ 
      email: "chatroom@test.com",
      password: "testingUser"
    })
    .then(response => {
      expect(response.statusCode).toBe(200);
      userId = jwtDecode(response.body.token).id;
    });
});

describe("POST/GET for chatroom", () => {
  let chatRoomId;
  test("testing POST chatroom", () => {
    return request(app)
      .post("/api/chatrooms/chatroom")
      .send({ users: testUserIds, chats: testChatIds })
      .then(response => {
        expect(response.statusCode).toBe(200);
        chatRoomId = response.body.data.chatRoomId;
      });
  })
  test("testing GET chatroom", () => {
    return request(app)
      .get("/api/chatrooms/" + chatRoomId)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.data.chatRoom.users)).toBe(true);
        expect(Array.isArray(response.body.data.chatRoom.chats)).toBe(true);
        response.body.data.chatRoom.users.map((userId, index) => {
          expect(userId).toBe(testUserIds[index]);
        })
        response.body.data.chatRoom.chats.map((message, index) => {
          expect(message).toBe(testChatIds[index]);
        })
      });
  })
  test("testing add chat to chatroom", () => {
    let chatId = "testChatId3";
    testChatIds.push("testChatId3");
    return request(app)
      .post("/api/chatrooms/addChat/" + chatRoomId + "/" + chatId)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.data.chatRoom.users)).toBe(true);
        expect(Array.isArray(response.body.data.chatRoom.chats)).toBe(true);
        response.body.data.chatRoom.users.map((userId, index) => {
          expect(userId).toBe(testUserIds[index]);
        })
        response.body.data.chatRoom.chats.map((message, index) => {
          expect(message).toBe(testChatIds[index]);
        })
        testChatIds.pop()
      });
  })
  afterAll(async () => {
    await Chatroom.deleteOne({ _id: chatRoomId });
  })
});

describe("Testing incorrect datatypes", () => {
  let chatRoomId;
  
  afterEach(async () => {
    await Chatroom.deleteOne({ _id: chatRoomId });
  });

  test("testing users as array of numbers chatroom", () => {
    return request(app)
      .post("/api/chatrooms/chatroom")
      .send({ users: [1, 2], chats: testChatIds })
      .then(response => {
        if(response.statusCode == 200) chatRoomId = response.body.data.chatRoomId;
        expect(response.statusCode).toBe(400);
      });
  });
  test("testing chats as array of numbers chatroom", () => {
    return request(app)
      .post("/api/chatrooms/chatroom")
      .send({ users: testUserIds, chats: [1, 2] })
      .then(response => {
        if(response.statusCode == 200) chatRoomId = response.body.data.chatRoomId;
        expect(response.statusCode).toBe(400);
      });
  });
  test("testing users as string chatroom", () => {
    return request(app)
      .post("/api/chatrooms/chatroom")
      .send({ users: "testUserId", chats: testChatIds })
      .then(response => {
        if(response.statusCode == 200) chatRoomId = response.body.data.chatRoomId;
        expect(response.statusCode).toBe(400);
      });
  });
  test("testing chats as string chatroom", () => {
    return request(app)
      .post("/api/chatrooms/chatroom")
      .send({ users: testUserIds, chats: "testChatId" })
      .then(response => {
        if(response.statusCode == 200) chatRoomId = response.body.data.chatRoomId;
        expect(response.statusCode).toBe(400);
      });
  });
});

afterAll(async () => {
  await User.deleteOne({ _id: userId });
});