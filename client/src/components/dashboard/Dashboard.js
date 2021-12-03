import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, getUser } from "../../actions/authActions";
import { getCourseDetails } from "../../actions/courseActions";
import { getAssignment } from "../../actions/assignmentActions"
import DashboardCard from "./DashboardCard";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      courseId: "",
      user: [],
      courses: [],
      assignments: [],
      isLoaded: false,
      errors: {}
    }
  }

  async getCourse(courseId) {
    const response = await getCourseDetails(courseId)
    return response
  };

  async getUser(userId) {
    const response = await getUser(userId)
    return response
  }

  async getAssignment(assignmentId) {
    const response = await (getAssignment(assignmentId))
    return response
  }

  // on page load
  async componentDidMount() {
    const userId = await this.props.auth.user.id        // get userID (who is logged in)
    const user = await getUser(userId)                  // axios call to get user (authActions -> routes/api/users.js)
    if (user.length) {
      localStorage.setItem("user", JSON.stringify(user))
    }
    this.setState({ user: user })                       // put response into state d

    const promises = this.state.user.courseIds ? this.state.user.courseIds.map(id => this.getCourse(id)) : []  // get array of promises
    const courses = await Promise.all(promises)                               // retrieve data from promises (the course objects)
    this.setState({ courses: courses })                                       // put response into state

    courses.map(course => {
      this.setState({ assignments: this.state.assignments.concat(course.assignmentIds) }) // putting assignments into state
    })

    const assignPromises = this.state.assignments ? this.state.assignments.map(id => this.getAssignment(id)) : []   // retrieve assignment objs from db using ids
    const assignObjs = await Promise.all(assignPromises)                              // await promises
    assignObjs.sort(function (a, b) {
      var keyA = new Date(a.dueDate), keyB = new Date(b.dueDate);
      if (keyA < keyB) return -1;
      if (keyB > keyA) return 1;
      return 0;
    })
    this.setState({ assignments: assignObjs })  // put response into state

    console.log(this.state.assignments)

    this.setState({ isLoaded: true })

  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  render() {
    const { user } = this.props.auth;

    return (
      <div className="w-screen h-screen bg-gray-800 bg-cover center">
        <a 
          href={"/faq"}
          className="fixed top-0 right-0 mt-4 mr-4 text-sm font-bold text-blue-500 hover:text-green-400 animate-bounce">
          FAQ
        </a>
        <div className="ml-12 col">
          <h1 className="py-8 font-mono text-2xl font-semibold text-center text-white flow-text grey-text">
            Welcome back, <span className="font-bold text-green-400">{this.state.user.name}</span>
          </h1>
          <div>
            <h1 className="font-sans text-sm font-semibold text-center text-yellow-400 text-bold">UPCOMING ASSIGNMENTS</h1>
          </div>
          {this.state.isLoaded ? this.state.assignments.map(assignment => <DashboardCard user={user.id} assignment={assignment} />) : <div> Loading </div>}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);