import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Switch, useRouteMatch } from "react-router-dom";
import PrivateRoute from "../private-route/PrivateRoute";
import Assignments from "./Assignments";
import AssignmentCreation from "./AssignmentCreation";
import Layout from "../layout/Layout";

function CourseRouter() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <PrivateRoute path={`${path}/:courseId/assignments`}>
        <Layout />
        <Assignments />
      </PrivateRoute>
      <PrivateRoute path={`${path}/:courseId/assignmentcreation`}>
        <Layout />
        <AssignmentCreation />
      </PrivateRoute>
      <PrivateRoute path={`${path}/:courseId/modules`}>
        <Layout />

      </PrivateRoute>
      <PrivateRoute path={`${path}/:courseId/announcements`}>
        <Layout />

      </PrivateRoute>
      <PrivateRoute path={`${path}/:courseId/grades`}>
        <Layout />

      </PrivateRoute>
      <PrivateRoute path={`${path}/:courseId/files`}>
        <Layout />

      </PrivateRoute>
      <PrivateRoute path={`${path}/:courseId/syllabus`}>
        <Layout />

      </PrivateRoute>
      <PrivateRoute path={`${path}/:courseId/chat`}>
        <Layout />

      </PrivateRoute>
    </Switch>
  )
}

export default connect(
)(CourseRouter);