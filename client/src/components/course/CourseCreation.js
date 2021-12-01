import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import FormButton from "../form/FormButton";
import { createCourse, addUserToCourse } from "../../actions/courseActions"

class CourseCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: "",
      courseSection: "",
      courseColor: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    
    const newCourse = {
      courseName: this.state.courseName,
      courseSection: this.state.courseSection,
      courseColor: this.state.courseColor
    };
    console.log(this.props);
    const courseId = await this.props.createCourse(newCourse, this.props.history);
    console.log(courseId)
    await this.props.addUserToCourse(courseId, this.props.auth.user.id)
    
    this.props.history.push(`/courses/${courseId}/assignments`)
    // There's a bug where pushing to assignments page doesn't load HTML until reload.
    window.location.reload()
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="h-screen px-12 pt-4 ml-16 bg-gray-800">
        <form noValidate onSubmit={this.onSubmit}>
          <div>
            <label class="block font-semibold text-2xl text-green-300 mb-2">
              Course
              <span className="text-gray-200"> Creation</span>
            </label>
          </div>

          <div className="my-4">
            <label class="block text-gray-300 text-sm font-bold mb-2">
              Course Name
            </label>
            <input
              onChange={this.onChange}
              value={this.state.courseName}
              error={errors.error}
              id="courseName"
              type="text"
              className={classnames("shadow appearance-none border bg-gray-200 focus:bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", {
                invalid: errors.error
              })} />
          </div>

          <div className="my-4">
            <label class="block text-gray-300 text-sm font-bold mb-2">
              Course Section
            </label>
            <input
              onChange={this.onChange}
              value={this.state.courseSection}
              error={errors.error}
              id="courseSection"
              type="text"
              className={classnames("shadow appearance-none border bg-gray-200 focus:bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", {
                invalid: errors.error
              })} />
          </div>

          <div className="my-4">
            <label class="block text-gray-300 text-sm font-bold mb-2">
              Course Color (
                <span className="text-red-500"> red </span>|
                <span className="text-yellow-500"> yellow </span>|
                <span className="text-green-500"> green </span>|
                <span className="text-blue-500"> blue </span>|
                <span className="text-indigo-500"> indigo </span>|
                <span className="text-purple-500"> purple </span>|
                <span className="text-pink-500"> pink </span>)
            </label>
            <input
              onChange={this.onChange}
              value={this.state.courseColor}
              error={errors.error}
              id="courseColor"
              type="text"
              className={classnames("shadow appearance-none border bg-gray-200 focus:bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", {
                invalid: errors.error
              })} />
          </div>


          <span className="text-xs italic text-red-500">
            {errors.error}
          </span>

          <div className="mt-8">
            <FormButton label="Create" color="blue" />
          </div>
        </form>
      </div>
    );
  }
}

CourseCreation.propTypes = {
  createCourse: PropTypes.func.isRequired,
  addUserToCourse: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default
  withRouter(
  connect(mapStateToProps, { createCourse, addUserToCourse })
(CourseCreation));