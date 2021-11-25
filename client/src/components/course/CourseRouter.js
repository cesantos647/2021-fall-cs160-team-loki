import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Link, useParams, useRouteMatch } from "react-router-dom";
import PrivateRoute from "../private-route/PrivateRoute";
import Assignments from "./Assignments";
import AssignmentCreation from "./AssignmentCreation";

class CourseRouter extends Component {
  render() {
    return (
      <CoursePages /> 
    )
  }
}

function CoursePages(props) {
  let { courseid } = useParams();
  let { path, url } = useRouteMatch();
  return (
    <Switch>
      <PrivateRoute path={`${path}/:courseId/assignments`} component={Assignments}/> 
      <PrivateRoute path={`${path}/:courseId/assignmentcreation`} component={AssignmentCreation} />
    </Switch>
  )
}

export default connect(
)(CourseRouter);