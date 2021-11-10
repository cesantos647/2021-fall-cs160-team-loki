import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { getCourseDetails } from "../../actions/courseActions";

class Assignments extends Component {
  constructor() {
    super();
    this.state = {
      courseId: "",
      course: {},
      errors: {}
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  onSubmit = async e => {
    e.preventDefault();

    const response = await getCourseDetails(this.state.courseId)
    this.setState({ course: response })
    console.log(response)
    console.log(this.state.course)
  }
  render() {
    const { errors } = this.state;

    var ass_data = null;
    var isRowLayout = true;
    return (
      /** Radio buttons currently inoperational, don't think we have Tailwind 2.2 installed yet (for easier implementation)*/
      /** isRowLayout is used to set the assignments to column view, rather than row view. To test, change value to false. */
      <div class="flex-col ml-16 bg-gray-800 h-full min-h-screen calc(w-screen - ml-16)">

        <div class="flex justify-end mr-4">
          <div class="ml-4">
            <div class="bg-blue-600 rounded-t-md text-gray-300">
              <div class="inline-flex">
                <input type="radio" name="view_type" id="rowView" checked hidden />
                <label for="rowView" class="label-checked:bg-green-400 radio text-center self-center py-2 px-4 cursor-pointer hover:text-green-300">Row View</label>
              </div>
              <div class="inline-flex">
                <input type="radio" name="view_type" id="colView" hidden />
                <label for="colView" class="label-checked:bg-green-400 radio text-center self-center py-2 px-4 cursor-pointer hover:text-green-300">Col. View</label>
              </div>
            </div>
          </div>
        </div>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="mb-4">
            <label class="block text-gray-300 text-sm font-bold mb-2" for="username">
              CourseId
            </label>
            <input
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="courseId"
              type="courseId"
              className={classnames("shadow appearance-none border bg-gray-200 focus:bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", {
                invalid: errors.email || errors.emailnotfound
              })}
            />
            <span className="text-xs italic text-red-500">
              {errors.email}
              {errors.emailnotfound}
              {errors.emailinputerror}
            </span>
          </div>
        </form>
        <p>
          { this.state.course.courseName || "" }
        </p>

        <div class={`ml-1 ${isRowLayout ? 'grid' : 'flex'}`}>
          <div class="border-t-4 border-yellow-400 p-4 mb-6" >
            <h1 class="pb-6 pt-2 px-2 text-xl text-yellow-400">Upcoming Assignments</h1>
            <ul class="border-4 border-opacity-25 border-gray-600">
              <div class="box-content border-2 border-t-0 border-opacity-50 border-green-300 bg-gray-700 p-4 flex hover:opacity-70">
                <div class="text-left pt-2 flex-1">
                  <p class="text-gray-100 text-lg font-semibold">Assignment 2</p>
                  <p class="text-green-400 text-md pt-1">Submitted</p>
                </div>
                <div class="text-right text-sm pt-3 flex-1">
                  <p class="text-pink-400 font-semibold">10/24/2021</p>
                  <p class="text-gray-400 pt-0.5">11/1/2021</p>
                </div>
              </div>
              <div class="box-content border-2 border-t-0 border-opacity-50 border-red-400 bg-gray-700 p-4 flex hover:opacity-70">
                <div class="text-left pt-2 flex-1">
                  <p class="text-gray-100 text-lg font-semibold">Assignment 3</p>
                  <p class="text-red-400 text-md pt-1">No Submission</p>
                </div>
                <div class="text-right text-sm pt-3 flex-1">
                  <p class="text-pink-400 font-semibold">11/1/2021</p>
                  <p class="text-gray-400 pt-0.5">11/8/2021</p>
                </div>
              </div>
              <div class="box-content border-2 border-t-0 border-opacity-50 border-yellow-400 bg-gray-700 p-4 flex hover:opacity-70">
                <div class="text-left pt-2 flex-1">
                  <p class="text-gray-100 text-lg font-semibold">Midterm 1</p>
                  <p class="text-yellow-400 text-md pt-1">Opens 11/1/2021</p>
                </div>
                <div class="text-right text-sm pt-3 flex-1">
                  <p class="text-pink-400 font-semibold">11/1/2021</p>
                  <p class="text-gray-400 pt-0.5">11/1/2021</p>
                </div>
              </div>
            </ul>
          </div>
          <div class="border-t-4 border-yellow-400 p-4 mb-6" >
            <h1 class="pb-6 pt-2 px-2 text-xl text-yellow-400">Past Assignments</h1>
            <ul class="border-4 border-opacity-25 border-gray-600">
              <div class="box-content border-2 border-t-0 border-opacity-50 border-green-300 bg-gray-700 p-4 flex hover:opacity-70">
                <div class="text-left pt-2 flex-1">
                  <p class="text-gray-100 text-lg font-semibold">Assignment 1</p>
                  <p class="text-green-400 text-md pt-1">30/40</p>
                </div>
                <div class="text-right text-sm pt-3 flex-1">
                  <p class="text-pink-400 font-semibold">10/15/2021</p>
                  <p class="text-gray-400 pt-0.5">10/22/2021</p>
                </div>
              </div>
              <div class="box-content border-2 border-t-0 border-opacity-50 border-green-300 bg-gray-700 p-4 flex hover:opacity-70">
                <div class="text-left pt-2 flex-1">
                  <p class="text-gray-100 text-lg font-semibold">Quiz 1</p>
                  <p class="text-green-400 text-md pt-1 font-bold">25/40</p>
                </div>
                <div class="text-right text-sm pt-3 flex-1">
                  <p class="text-pink-400 font-semibold">10/24/2021</p>
                  <p class="text-gray-400 pt-0.5">10/24/2021</p>
                </div>
              </div>
              <div class="box-content border-2 border-t-0 border-opacity-50 border-red-400 bg-gray-700 p-4 flex hover:opacity-70">
                <div class="text-left pt-2 flex-1">
                  <p class="text-gray-100 text-lg font-semibold">Proof of Requisite</p>
                  <p class="text-red-400 text-md pt-1">Missing</p>
                </div>
                <div class="text-right text-sm pt-3 flex-1">
                  <p class="text-pink-400 font-semibold">8/30/2021</p>
                  <p class="text-gray-400 pt-0.5">8/30/2021</p>
                </div>
              </div>
            </ul>
          </div>

          <div class="border-t-4 border-yellow-400 p-4 mb-6" >
            <h1 class="pb-6 pt-2 px-2 text-xl text-yellow-400">Assignments from Database</h1>
            <ul class="border-4 border-opacity-25 border-gray-600">
              <div class="box-content border-2 border-t-0 border-opacity-50 border-green-300 bg-gray-700 p-4 flex hover:opacity-70">
                <div class="text-left pt-2 flex-1">
                  <p class="text-gray-100 text-lg font-semibold">name</p>
                  <p class="text-green-400 text-md pt-1">pts/total_pts</p>
                </div>
                <div class="text-right text-sm pt-3 flex-1">
                  <p class="text-pink-400 font-semibold">due_date</p>
                  <p class="text-gray-400 pt-0.5">close_date</p>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}


Assignments.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
)(Assignments);