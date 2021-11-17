const request = require("supertest");
const app = require("../server");
const User = require("../models/User");
const jwtDecode = require('jwt-decode');

var token;
var userId;

beforeAll(async () => {
  await request(app)
    .post("/api/users/register")
    .send({ 
      name: "testingUser",
      email: "user@test.com",
      password: "testingUser",
      password2: "testingUser"
    })
    .then(response => {
      expect(response.statusCode).toBe(200);
    });
  await request(app)
    .post("/api/users/login")
    .send({ 
      email: "user@test.com",
      password: "testingUser"
    })
    .then(response => {
      expect(response.statusCode).toBe(200);
      token = response.body.token
      userId = jwtDecode(token).id;
    });
});
describe("Basic example tests", () => {
    // insert tests here
  });
describe("Basic example tests", () => {
    // insert tests here
  });
describe("Basic example tests", () => {
    // insert tests here
  });
describe("Basic example tests", () => {
    // insert tests here
  });
describe("Basic example tests", () => {
    // insert tests here
  });



afterAll(async () => {
  await User.deleteOne({ _id: userId });
});