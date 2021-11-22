import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FormField from "../form/FormField";
import FormButton from "../form/FormButton";

class CourseCreation extends Component {
  render() {
    return (
      <div className="h-screen px-12 pt-4 ml-16 bg-gray-800">
        <form noValidate onSubmit={this.onSubmit}>
          <div>
            <label class="block font-semibold text-2xl text-green-300 mb-2">
              Course
              <span className="text-gray-200"> Creation</span>
            </label>
          </div>
          <FormField label="Course Name"/>
          <FormField label="Course Section"/>
          <div className="mt-8">
            <FormButton label="Create" color="blue"/>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
)(CourseCreation);