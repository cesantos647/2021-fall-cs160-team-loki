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
  
  async getCourse( courseId ) {
    const response = await getCourseDetails(courseId)
    return response
  };

  async getUser( userId ) {
    const response = await getUser(userId)
    return response
  }

  async getAssignment( assignmentId ) {
    const response = await(getAssignment(assignmentId))
    return response
  }

  // on page load
  async componentDidMount() {
    const userId = await this.props.auth.user.id    // get userID (who is logged in)
    const user = await getUser(userId)              // axios call to get user (authActions -> routes/api/users.js)
    this.setState({ user: user })                   // put response into state d
    
    const promises = this.state.user.courseIds.map(id => this.getCourse(id))  // get array of promises
    const courses = await Promise.all(promises)                               // retrieve data from promises (the course objects)
    this.setState({ courses: courses })                                       // put response into state

    courses.map(course => {
      this.setState({ assignments: this.state.assignments.concat(course.assignmentIds) }) // putting assignments into state
    })

    const assignPromises = this.state.assignments.map(id => this.getAssignment(id))   // retrieve assignment objs from db using ids
    const assignObjs = await Promise.all(assignPromises)                              // await promises
    assignObjs.sort(function(a, b) {
      var keyA = new Date(a.dueDate), keyB = new Date(b.dueDate);
      if (keyA < keyB) return -1;
      if (keyB > keyA) return 1;
      return 0;
    })
    this.setState({ assignments: assignObjs })  // put response into state


    this.setState({ isLoaded: true })
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

render() {
    const { user } = this.props.auth;

return (
      <div className="w-screen h-screen bg-gray-800 center">
        <div className="ml-20 row">
          <div className="col s12">
            <h4>
              <div className="text-green-400">Hey there,
              <span className="font-bold text-yellow-300">{" " + user.id.split(" ")[0] }</span>
              </div>
              <p className="text-white flow-text grey-text">
                You are currently on the dashboard.
                <span className="font-bold text-red-500"> (IN PROGRESS)</span>
                {this.state.isLoaded ? this.state.assignments.map(assignment => <DashboardCard user={user.id} assignment={assignment}/>) : <div> Loading </div>}
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="bg-blue-800 rounded-lg hover:bg-red-500">
                <h1 class="break-words p-1 text-normal text-center text-bold text-yellow-300 hover:text-white">Logout</h1>
            </button>
          </div>
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