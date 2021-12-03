import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Switch } from "react-router-dom";
import PrivateRoute from "../private-route/PrivateRoute";
import Layout from "../layout/Layout";
import CourseCreation from "../course/CourseCreation";
import Dashboard from "../dashboard/Dashboard";
import FAQ from "../supportpages/FAQ";

function UserRouter() {
  return (
    <Switch>
      <PrivateRoute path="/coursecreation">
        <Layout />
        <CourseCreation />
      </PrivateRoute>
      <PrivateRoute path="/dashboard">
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
      <PrivateRoute path="/faq">
        <Layout />
        <FAQ />
      </PrivateRoute>
    </Switch>
  )
}

export default connect(
)(UserRouter);