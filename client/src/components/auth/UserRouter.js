import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Switch } from "react-router-dom";
import PrivateRoute from "../private-route/PrivateRoute";
import Layout from "../layout/Layout";
import CourseCreation from "../course/CourseCreation";
import Dashboard from "../dashboard/Dashboard";

function CourseRouter(props) {
  return (
    <Switch>
      <PrivateRoute path="/coursecreation" component={CourseCreation}>
        <Layout />
        <CourseCreation />
      </PrivateRoute>
      <PrivateRoute path="/dashboard" component={Dashboard}>
        <Layout />
        <Dashboard />
      </PrivateRoute>
      <PrivateRoute path="/notifications">
        <Layout />

      </PrivateRoute>
      <PrivateRoute path="/files">
        <Layout />

      </PrivateRoute>
      <PrivateRoute path="/settings">
        <Layout />

      </PrivateRoute>
    </Switch>
  )
}

export default connect(
)(CourseRouter);