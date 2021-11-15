import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Assignments extends Component {

  constructor(props) {
    super(props);
    this.state = { isRowLayout: false }
    this.handleLayoutToggle = this.handleLayoutToggle.bind(this);
  }

  handleLayoutToggle() {
    this.setState(prevState => ({
      isRowLayout: !prevState.isRowLayout
    }));
  }

  render() {
    var ass_data = null;
    return (
      /** isRowLayout is used to set the assignments to column view, rather than row view. To test, change value to false. */
      <div class="flex-col ml-16 bg-gray-800 h-full min-h-screen">

        <div class="fixed right-0">
          <button onClick={this.handleLayoutToggle} class={`border-4 opacity-90 border-opacity-70 rounded-lg m-4 bg-blue-900 text-blue-300 hover:bg-blue-800 hover:text-green-300 hover:opacity-100 hover:border-opacity-100
            ${this.state.isRowLayout ? "border-yellow-300 hover:border-green-400" : "border-green-400 hover:border-yellow-300" }`}>
            {
              this.state.isRowLayout ?
                <svg class="h-7 w-7 mx-3" viewBox="0 0 20 20" fill="#FBBF24" stroke="currentColor" strokeWidth=".2" >
                  <path d="M6.634,13.591H2.146c-0.247,0-0.449,0.201-0.449,0.448v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449v-2.692C7.083,13.792,6.881,13.591,6.634,13.591 M6.185,16.283h-3.59v-1.795h3.59V16.283zM6.634,8.205H2.146c-0.247,0-0.449,0.202-0.449,0.449v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V8.653C7.083,8.407,6.881,8.205,6.634,8.205 M6.185,10.897h-3.59V9.103h3.59V10.897z M6.634,2.819H2.146c-0.247,0-0.449,0.202-0.449,0.449V5.96c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V3.268C7.083,3.021,6.881,2.819,6.634,2.819 M6.185,5.512h-3.59V3.717h3.59V5.512z M15.933,5.683c-0.175-0.168-0.361-0.33-0.555-0.479l1.677-1.613c0.297-0.281,0.088-0.772-0.31-0.772H9.336c-0.249,0-0.448,0.202-0.448,0.449v7.107c0,0.395,0.471,0.598,0.758,0.326l1.797-1.728c0.054,0.045,0.107,0.094,0.161,0.146c0.802,0.767,1.243,1.786,1.243,2.867c0,1.071-0.435,2.078-1.227,2.837c-0.7,0.671-1.354,1.086-2.345,1.169c-0.482,0.041-0.577,0.733-0.092,0.875c0.687,0.209,1.12,0.314,1.839,0.314c0.932,0,1.838-0.173,2.673-0.505c0.835-0.33,1.603-0.819,2.262-1.449c1.322-1.266,2.346-2.953,2.346-4.751C18.303,8.665,17.272,6.964,15.933,5.683 M15.336,14.578c-1.124,1.077-2.619,1.681-4.217,1.705c0.408-0.221,0.788-0.491,1.122-0.812c0.97-0.929,1.504-2.168,1.504-3.485c0-1.328-0.539-2.578-1.521-3.516c-0.178-0.17-0.357-0.321-0.548-0.456c-0.125-0.089-0.379-0.146-0.569,0.041L9.769,9.327v-5.61h5.861l-1.264,1.216c-0.099,0.094-0.148,0.229-0.137,0.366c0.014,0.134,0.088,0.258,0.202,0.332c0.313,0.204,0.61,0.44,0.882,0.7c1.158,1.111,2.092,2.581,2.092,4.145C17.405,12.026,16.48,13.482,15.336,14.578"></path>
                </svg> :
                <svg class="h-7 w-7 mx-3" viewBox="0 0 20 20" fill="white" stroke="currentColor" strokeWidth=".2" >
                  <path d="M6.634,13.591H2.146c-0.247,0-0.449,0.201-0.449,0.448v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449v-2.692C7.083,13.792,6.881,13.591,6.634,13.591 M6.185,16.283h-3.59v-1.795h3.59V16.283zM6.634,8.205H2.146c-0.247,0-0.449,0.202-0.449,0.449v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V8.653C7.083,8.407,6.881,8.205,6.634,8.205 M6.185,10.897h-3.59V9.103h3.59V10.897z M6.634,2.819H2.146c-0.247,0-0.449,0.202-0.449,0.449V5.96c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V3.268C7.083,3.021,6.881,2.819,6.634,2.819 M6.185,5.512h-3.59V3.717h3.59V5.512z M15.933,5.683c-0.175-0.168-0.361-0.33-0.555-0.479l1.677-1.613c0.297-0.281,0.088-0.772-0.31-0.772H9.336c-0.249,0-0.448,0.202-0.448,0.449v7.107c0,0.395,0.471,0.598,0.758,0.326l1.797-1.728c0.054,0.045,0.107,0.094,0.161,0.146c0.802,0.767,1.243,1.786,1.243,2.867c0,1.071-0.435,2.078-1.227,2.837c-0.7,0.671-1.354,1.086-2.345,1.169c-0.482,0.041-0.577,0.733-0.092,0.875c0.687,0.209,1.12,0.314,1.839,0.314c0.932,0,1.838-0.173,2.673-0.505c0.835-0.33,1.603-0.819,2.262-1.449c1.322-1.266,2.346-2.953,2.346-4.751C18.303,8.665,17.272,6.964,15.933,5.683 M15.336,14.578c-1.124,1.077-2.619,1.681-4.217,1.705c0.408-0.221,0.788-0.491,1.122-0.812c0.97-0.929,1.504-2.168,1.504-3.485c0-1.328-0.539-2.578-1.521-3.516c-0.178-0.17-0.357-0.321-0.548-0.456c-0.125-0.089-0.379-0.146-0.569,0.041L9.769,9.327v-5.61h5.861l-1.264,1.216c-0.099,0.094-0.148,0.229-0.137,0.366c0.014,0.134,0.088,0.258,0.202,0.332c0.313,0.204,0.61,0.44,0.882,0.7c1.158,1.111,2.092,2.581,2.092,4.145C17.405,12.026,16.48,13.482,15.336,14.578"></path>
                </svg>
            }
          </button>
        </div>

        <div class={`ml-1 ${this.state.isRowLayout ? 'grid' : 'flex'}`}>
          <div class="border-t-4 border-yellow-400 p-4 mb-6" >
            <h1 class="pb-6 pt-2 px-2 text-xl text-yellow-400">Upcoming Assignments</h1>
            <ul class="border-4 border-opacity-25 border-gray-600">
              <div class="box-content border-2 border-t-0 border-opacity-50 border-green-400 bg-gray-700 p-4 flex hover:opacity-70">
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
              <div class="box-content border-2 border-t-0 border-opacity-50 border-green-400 bg-gray-700 p-4 flex hover:opacity-70">
                <div class="text-left pt-2 flex-1">
                  <p class="text-gray-100 text-lg font-semibold">Assignment 1</p>
                  <p class="text-green-400 text-md pt-1 font-bold">30/40</p>
                </div>
                <div class="text-right text-sm pt-3 flex-1">
                  <p class="text-pink-400 font-semibold">10/15/2021</p>
                  <p class="text-gray-400 pt-0.5">10/22/2021</p>
                </div>
              </div>
              <div class="box-content border-2 border-t-0 border-opacity-50 border-green-400 bg-gray-700 p-4 flex hover:opacity-70">
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
              <AssignmentBtn name="New Assignment" issubmitted={true} isgraded={true} duedate="11/1/2021" closedate="11/7/2021" pts="90" posspts="100" />
              <AssignmentBtn name="New Assignment" issubmitted={false} isgraded={true} duedate="11/1/2021" closedate="11/7/2021" pts="0" posspts="100" />
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function AssignmentBtn(props) {
  return (
    <div class={`box-content border-2 border-t-0 border-opacity-50 ${props.issubmitted ? "border-green-400" : "border-red-400"} bg-gray-700 p-4 flex hover:opacity-70`}>
      <div class="text-left pt-2 flex-1">
        <p class="text-gray-100 text-lg font-semibold">{props.name}</p>
        <div class={`text-md ${props.issubmitted ? "text-green-400" : "text-red-400"} pt-1`}>
          {props.isgraded ?
            <p class="font-bold">{props.pts + "/" + props.posspts}</p> :
            <p>{props.issubmitted ? "Submitted" : "No Submission"}</p>
          }
        </div>
      </div>
      <div class="text-right text-sm pt-3 flex-1">
        <p class="text-pink-400 font-semibold">{props.duedate}</p>
        <p class="text-gray-400 pt-0.5">{props.closedate}</p>
      </div>
    </div>
  )
}

export default connect(
)(Assignments);