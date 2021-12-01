import axios from "axios";
import jwt_decode from "jwt-decode";

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
  axios
    .post("/api/courses", courseData)
    .then(res => {
      let courseId = res.data.data.courseId
      console.log("New Course ID: " + courseId);
      history.push(`/courses/${courseId}/chat`)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};