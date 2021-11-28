import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import FormButton from "../form/FormButton";
import { createAssignment } from "../../actions/assignmentActions"

class AssignmentCreation extends Component {
  constructor() {
    super();
    this.state = {
      assignmentName: "",
      dueDate: new Date(),
      openDate: new Date(),
      closeDate: new Date(),
      totalPossiblePoints: '',
      assignmentDescription: "",
      errors: {}
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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

    const newAssignment = {
      assignmentName: this.state.assignmentName,
      dueDate: this.state.dueDate,
      openDate: this.state.openDate,
      closeDate: this.state.closeDate,
      totalPossiblePoints: this.state.totalPossiblePoints,
      assignmentDescription: this.state.assignmentDescription
    };

    this.props.createAssignment(newAssignment, this.props.history, this.props.match.params.courseId);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="h-screen px-12 pt-4 ml-16 bg-gray-800">
        <form noValidate onSubmit={this.onSubmit}>
          <div>
            <label class="block font-semibold text-2xl text-green-300 mb-2">
              Assignment
              <span className="text-gray-200"> Creation</span>
            </label>
          </div>

          <div className="my-4">
            <label class="block text-gray-300 text-sm font-bold mb-2">
              Assignment Name
            </label>
            <input
              onChange={this.onChange}
              value={this.state.assignmentName}
              error={errors.error}
              id="assignmentName"
              type="text"
              className={classnames("shadow appearance-none border bg-gray-200 focus:bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", {
                invalid: errors.error
              })} />
          </div>

          
          <div className="my-4">
            <label class="block text-gray-300 text-sm font-bold mb-2">
              Open Date (MM-dd-YYYY)
            </label>
            <input
              onChange={this.onChange}
              value={this.state.openDate}
              error={errors.error}
              id="openDate"
              type="date"
              className={classnames("shadow appearance-none border bg-gray-200 focus:bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", {
                invalid: errors.error
              })} />
          </div>

          <div className="my-4">
            <label class="block text-gray-300 text-sm font-bold mb-2">
              Due Date (MM-dd-YYYY)
            </label>
            <input
              onChange={this.onChange}
              value={this.state.dueDate}
              error={errors.error}
              id="dueDate"
              type="date"
              className={classnames("shadow appearance-none border bg-gray-200 focus:bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", {
                invalid: errors.error
              })} />
          </div>

          <div className="my-4">
            <label class="block text-gray-300 text-sm font-bold mb-2">
              Close Date (MM-dd-YYYY)
            </label>
            <input
              onChange={this.onChange}
              value={this.state.closeDate}
              error={errors.error}
              id="closeDate"
              type="date"
              className={classnames("shadow appearance-none border bg-gray-200 focus:bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", {
                invalid: errors.error
              })} />
          </div>

          <div className="my-4">
            <label class="block text-gray-300 text-sm font-bold mb-2">
              Total Possible Points
            </label>
            <input
              onChange={this.onChange}
              value={this.state.totalPossiblePoints}
              error={errors.error}
              id="totalPossiblePoints"
              type="int"
              className={classnames("shadow appearance-none border bg-gray-200 focus:bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", {
                invalid: errors.error
              })} />
          </div>

          <div className="my-4">
            <label class="block text-gray-300 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              onChange={this.onChange}
              value={this.state.assignmentDescription}
              error={errors.error}
              id="assignmentDescription"
              type="text"
              className={classnames("form-textarea block mt-1 shadow appearance-none border bg-gray-200 focus:bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", {
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

AssignmentCreation.propTypes = {
  createAssignment: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default
  withRouter(
  connect(mapStateToProps, { createAssignment })
(AssignmentCreation));