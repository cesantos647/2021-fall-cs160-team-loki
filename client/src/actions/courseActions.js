import axios from "axios";

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