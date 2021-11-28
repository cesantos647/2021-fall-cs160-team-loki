import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import FormButton from "../form/FormButton";
import { createCourse } from "../../actions/courseActions"

class CourseCreation extends Component {
  constructor() {
    super();
    this.state = {
      courseName: "",
      courseSection: "",
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

  onSubmit = e => {
    e.preventDefault();

    const newCourse = {
      courseName: this.state.courseName,
      courseSection: this.state.courseSection
    };

    this.props.createCourse(newCourse, this.props.history);
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
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createCourse }
)(CourseCreation);