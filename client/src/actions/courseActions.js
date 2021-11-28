import axios from "axios";
import { GET_ERRORS } from "./types"

export const getCourseDetails = (courseId, history) => {
  return axios
    .get(`/api/courses/${courseId}`)
    .then(res => {
      return res.data.data
    })
    .catch(err =>
      // Do something here
      console.log(err)
    );
};

export const createCourse = (courseData, history) => dispatch => {
  return axios
    .post("/api/courses", courseData)
    .then(res => {
      let courseId = res.data.data.courseId
      console.log("New course created /w ID: " + courseId)
      history.push(`/courses/${courseId}/assignments`)
      return courseId
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addUserToCourse = (userId, courseId) => dispatch => {
  axios
    .put(`/api/courses/${courseId}/${userId}`)
    .catch(err =>
      console.log(err)
    );
}