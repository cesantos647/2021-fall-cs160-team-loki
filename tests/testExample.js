const request = require("supertest");
const app = require("../server");

describe("Basic example tests", () => {
  let token;
  let courseId;
  test("Testing login", () => {
    return request(app)
      .post("/api/users/login")
      .send({ 
        email: "c@c.org",
        password: "happyhappy",
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        token = response.body.token
      });
  });
  test("testing POST courses", () => {
    return request(app)
      .post("/api/courses/")
      .set('Authorization', token)
      .send({courseName: "CS160", courseSection: "03"})
      .then(response => {
        expect(response.statusCode).toBe(200);
        courseId = response.body.data.courseId
      })
  })
  test("testing GET courses", () => {
    return request(app)
      .get("/api/courses/" + courseId)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.data.courseName).toBe("CS160")
      })
  })
});