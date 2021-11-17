const request = require("supertest");
const app = require("../server");
const User = require("../models/User");
const Assignment = require("../models/AssignmentModel");
const jwtDecode = require('jwt-decode');

var token;
var userId;
var testDate = new Date();

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
  let assignmentId;
  test("Create Assignment", () => {
    return request(app)
    .post("/api/assignments/")
    .sent({assignmentName: "name", professorId: userId.toString(), dueDate: testDate, totalPossiblePoints:10})
    .then(response => {
      expect(response.statusCode).toBe(200);
      assignmentId = response.body.data.assignmentId;
    });
})
test("Get Assignment", () => {
    return request(app)
    .get("/api/assignments/" + assignmentId)
    .then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body.data.assignmentName).toBe("name");
      expect(response.body.data.professorId).toBe(userId.toString());
      expect(response.body.data.totalPossiblePoints).toBe(10);
    });
})
test("Update Assignment", () => {
    return request(app)
    .put("/api/assignments/" + assignmentId)
    .sent({assignmentName: "new name", professorId: userId.toString(), dueDate: testDate, totalPossiblePoints:10})
    .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.data.assignmentName).toBe("new name");
        expect(response.body.data.professorId).toBe(userId.toString());
        expect(response.body.data.totalPossiblePoints).toBe(10);
    });
})
test("Delete Assignment", () => {
    return request(app)
    .delete("/api/assignments/" + assignmentId)
    .then(response => {
      expect(response.statusCode).toBe(200);
    });
})
});

afterAll(async () => {
  await User.deleteOne({ _id: userId });
});