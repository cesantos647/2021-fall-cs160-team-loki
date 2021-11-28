import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Route, Switch } from "react-router-dom";
import Layout from "../layout/Layout";
import CourseCreation from "../course/CourseCreation";
import Dashboard from "../dashboard/Dashboard";

function UserRouter(props) {
  return (
    <Switch>
      <Route path="/coursecreation">
        <Layout />
        <CourseCreation />
      </Route>
      <Route path="/dashboard">
        <Layout />
        <Dashboard />
      </Route>
      <Route path="/notifications">
        <Layout />

      </Route>
      <Route path="/files">
        <Layout />

      </Route>
      <Route path="/settings">
        <Layout />

      </Route>
    </Switch>
  )
}

export default connect(
)(UserRouter);