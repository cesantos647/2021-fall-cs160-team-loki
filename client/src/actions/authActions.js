import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token, data } = res.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("user", JSON.stringify(data));
      // Set token to Auth header
      setAuthToken(token);
      // Set current user
      dispatch(setCurrentUser(data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const getUser = (userId, history) => {
  return axios
    .get(`/api/users/${userId}`)
    .then(res => {
      return res.data.data
    })
    .catch(err => {
      console.log(err)
    }
    );
};

export const getUserAssignments = (userId, history) => {
  return axios
    .get(`/api/users/${userId}/assignments`)
    .then(res => {
      return res.data.data
    })
    .catch(err => {
      console.log(err)
    }
    );
};