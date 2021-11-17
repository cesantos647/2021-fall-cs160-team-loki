const request = require("supertest");
const app = require("../server");
const User = require("../models/User");
const Chat = require("../models/Chat");
const jwtDecode = require('jwt-decode');

var userId;
var chatId;
var testMessages = ["test message 1", "test message 2"];
var testUserIds = ["userId1", "userId2"];

beforeAll(async () => {
  await request(app)
    .post("/api/users/register")
    .send({ 
      name: "testingUser",
      email: "chat@test.com",
      password: "testingUser",
      password2: "testingUser"
    })
    .then(response => {
      expect(response.statusCode).toBe(200);
    });
  await request(app)
    .post("/api/users/login")
    .send({ 
      email: "chat@test.com",
      password: "testingUser"
    })
    .then(response => {
      expect(response.statusCode).toBe(200);
      userId = jwtDecode(response.body.token).id;
    });
});

describe("POST/GET for chats", () => {
  test("testing POST chat", () => {
    return request(app)
      .post("/api/chats/chat")
      .send({ messages: testMessages, users: testUserIds })
      .then(response => {
        expect(response.statusCode).toBe(200);
        chatId = response.body.data.chatId;
      });
  })
  test("testing GET chat", () => {
    return request(app)
      .get("/api/chats/" + chatId)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.data.chat.messages)).toBe(true);
        expect(Array.isArray(response.body.data.chat.users)).toBe(true);
        response.body.data.chat.messages.map((message, index) => {
          expect(message).toBe(testMessages[index]);
        })
        response.body.data.chat.users.map((userId, index) => {
          expect(userId).toBe(testUserIds[index]);
        })
      });
  })
  afterAll(async () => {
    await Chat.deleteOne({ _id: chatId });
  })
});

describe("Testing incorrect datatypes", () => {
  test("testing messages as array of numbers chat", () => {
    return request(app)
      .post("/api/chats/chat")
      .send({ messages: [1, 2], users: testUserIds })
      .then(response => {
        if(response.statusCode == 200) chatId = response.body.data.chatId;
        expect(response.statusCode).toBe(400);
      });
  });
  test("testing users as array of numbers chat", () => {
    return request(app)
      .post("/api/chats/chat")
      .send({ messages: testMessages, users: [1, 2] })
      .then(response => {
        if(response.statusCode == 200) chatId = response.body.data.chatId;
        expect(response.statusCode).toBe(400);
      });
  });
  test("testing messages as string chat", () => {
    return request(app)
      .post("/api/chats/chat")
      .send({ messages: "message", users: testUserIds })
      .then(response => {
        if(response.statusCode == 200) chatId = response.body.data.chatId;
        expect(response.statusCode).toBe(400);
      });
  });
  test("testing users as string chat", () => {
    return request(app)
      .post("/api/chats/chat")
      .send({ messages: testMessages, users: "user" })
      .then(response => {
        if(response.statusCode == 200) chatId = response.body.data.chatId;
        expect(response.statusCode).toBe(400);
      });
  });
  afterEach(async () => {
    await Chat.deleteOne({ _id: chatId });
  });
});

afterAll(async () => {
  await User.deleteOne({ _id: userId });
});

