import axios from "axios";
import {GET_ERRORS} from "./types"

export const getAssignment = (assignmentId, history) => {
  return axios
    .get(`/api/assignments/${assignmentId}`)
    .then(res => {
      return res.data.data
    })
    .catch(err => {
      console.log(err)
    }
    );
};

export const createAssignment = (assignmentData, history, courseId) => dispatch => {
  axios
    .post("/api/assignments", assignmentData)
    .then(res => {
      let assignmentId = res.data.data.assignmentId
      console.log("New Assignment ID: " + assignmentId);
      history.push(`/courses/${courseId}/assignments`)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const createCourseAssignment = (assignmentData, history, courseId) => dispatch => {
  axios
    .post(`/api/assignments/${courseId}`, assignmentData)
    .then(res => {
      let assignmentId = res.data.data.assignmentId
      console.log("New Assignment ID: " + assignmentId);
      history.push(`/courses/${courseId}/assignments`)
      history.go(0)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};