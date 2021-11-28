import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import Assignments from "./Assignments";
import AssignmentCreation from "./AssignmentCreation";
import Layout from "../layout/Layout";

function CourseRouter(props) {
  let { courseId } = useParams();
  let { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/:courseId/assignments`}>
        <Layout />
        <Assignments />
      </Route>
      <Route path={`${path}/:courseId/assignmentcreation`}>
        <Layout />
        <AssignmentCreation />
      </Route>
      <Route path={`${path}/:courseId/modules`}>
        <Layout />

      </Route>
      <Route path={`${path}/:courseId/announcements`}>
        <Layout />

      </Route>
      <Route path={`${path}/:courseId/grades`}>
        <Layout />

      </Route>
      <Route path={`${path}/:courseId/files`}>
        <Layout />

      </Route>
      <Route path={`${path}/:courseId/syllabus`}>
        <Layout />

      </Route>
      <Route path={`${path}/:courseId/chat`}>
        <Layout />

      </Route>
    </Switch>
  )
}

export default connect(
)(CourseRouter);