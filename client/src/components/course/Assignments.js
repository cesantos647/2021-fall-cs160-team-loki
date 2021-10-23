import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Assignments extends Component {

  render() {
    var ass_data = null;
    return (
      /** Currently 'grid' for horizontal layout. Replace 'grid' /w 'flex' for vertical layout. */
      <div class="bg-gray-800 w-screen h-screen grid grid-1">

        <div class="border-t-4 border-yellow-400 bg-gray-800 p-4 mb-6" >
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
        <div class="border-t-4 border-yellow-400 bg-gray-800 p-4 mb-6" >
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

        
        <div class="border-t-4 border-yellow-400 bg-gray-800 p-4 mb-6" >
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