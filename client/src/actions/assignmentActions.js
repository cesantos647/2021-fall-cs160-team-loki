import axios from "axios";

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