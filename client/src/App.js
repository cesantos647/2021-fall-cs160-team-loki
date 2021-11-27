import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Layout from "./components/layout/Layout";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import CourseCreation from "./components/course/CourseCreation";
import CourseRouter from "./components/course/CourseRouter";
import "tailwindcss/tailwind.css"

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  const userData = JSON.parse(localStorage.user);
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(userData));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <div>
                <Switch>
                  <PrivateRoute path="/dashboard">
                    <Layout/>
                    <Dashboard/>
                  </PrivateRoute>
                  <PrivateRoute path="/coursecreation">
                    <Layout/>
                    <CourseCreation/>
                  </PrivateRoute>
                  <PrivateRoute path="/courses">
                    <Layout/>
                    <CourseRouter/>
                  </PrivateRoute>
                  <PrivateRoute path="/notifications">
                    <Layout/>
                  </PrivateRoute>
                  <PrivateRoute path="/files">
                    <Layout/>
                  </PrivateRoute>
                  <PrivateRoute path="/settings">
                    <Layout/>
                  </PrivateRoute>
                </Switch>
              </div>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;