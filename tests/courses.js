const request = require("supertest");
const app = require("../server");
const User = require("../models/User");
const Course = require("../models/CourseModel");
const jwtDecode = require('jwt-decode');

var token;
var userId;

var testUserIds;
var testStudentId = "aeeeded"

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
      console.log(token)
      userId = jwtDecode(token).id;
    });
});
describe("Test functionality", () => {
  console.log(token)
    let courseId;
    test("Create Course", () => {
        return request(app)
        .post("/api/courses/")
        .set({'Authorization': token})
        .send({courseName: "CS160", courseSection: "Section 03"})
        .then(response => {
            expect(response.statusCode).toBe(200);
            courseId = response.body.data.courseId;
        });
    })
    test("Get Course Details", () => {
        return request(app)
        .get("/api/courses/" + courseId)
        .set({'Authorization': token})
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body.data.courseName).toBe("CS160");
            expect(response.body.data.courseSection).toBe("Section 03");
            expect(response.body.data.professorId).toBe(userId);
        })
    })
    test("Update Course Details", () => {
        return request(app)
        .put("/api/courses/" + courseId)
        .set({'Authorization': token})
        .send({courseName: "CS160", courseSection: "Section 02"})
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body.data.courseName).toBe("CS160");
            expect(response.body.data.courseSection).toBe("Section 02");
            expect(response.body.data.professorId).toBe(userId);
        })
    })
    test("Add a student to a course with student ID", () => {
        return request(app)
        .put("/api/courses/" + courseId + "/" + userId)
        .set({'Authorization': token})
        .then(response => {
            expect(response.statusCode).toBe(200);
        })
    })
    test("Remove a student to a course with student ID", () => {
        return request(app)
        .put("/api/courses/" + courseId + "/delete/" + userId)
        .set({'Authorization': token})
        .then(response => {
            expect(response.statusCode).toBe(200);
        })
    })
    test("Delete Course", () => {
        return request(app)
        .delete("/api/courses/" + courseId)
        .set({'Authorization': token})
        .then(response => {
            expect(response.statusCode).toBe(200);
        })
    })
  });

afterAll(async () => {
  await User.deleteOne({ _id: userId });
});