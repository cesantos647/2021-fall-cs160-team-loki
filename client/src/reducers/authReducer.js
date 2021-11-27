import {
    SET_CURRENT_USER,
    USER_LOADING,
    SET_USER_DATA
  } from "../actions/types";

  const isEmpty = require("is-empty");

  const initialState = {
    isAuthenticated: false,
    user: {},
    data: {},
    loading: false
  };

  // eslint-disable-next-line
  export default function (state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        };
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
      case SET_USER_DATA:
        return {
          ...state,
          data: action.payload
        };
      default:
        return state;
    }
  }