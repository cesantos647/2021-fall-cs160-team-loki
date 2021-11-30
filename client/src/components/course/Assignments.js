import { useEffect, useState } from "react";
import React, { useParams } from "react-router-dom";
import { connect } from "react-redux";
import FloatButton from "../layout/FloatButton";
import { getUserAssignments } from "../../actions/authActions";
import { getAssignment } from "../../actions/assignmentActions";

const Assignments = () => {

  const [isRowLayout, toggleRowLayout] = useState(true);
  const [userId, setUserId] = useState("");
  const [courseId] = useState(useParams().courseId);
  const [allAssignmentIds, setAllAssignmentIds] = useState({});
  const [courseAssignmentIds, setCourseAssignmentIds] = useState({});
  const [assignmentData, setAssignmentData] = useState({});

  // Do async REST calls on startup, after user data is retrieved from local storage.
  useEffect(async () => {
    // Get user id.
    const userId = JSON.parse(localStorage.user).id
    setUserId(JSON.parse(localStorage.user).id)
    
    // REST calls.
    const getAllAssignments = async (userId, courseId) => {
      return await getUserAssignments(userId)
        .then(res => {
          return res;
        })
        .catch(() => { })
    }
    const getCourseAssignment = async (assignmentId) => {
      return await getAssignment(assignmentId)
        .then(res => {
          return res;
        })
        .catch(() => { })
    }

    // Parse assignments of a given course from user's total assignments.
    let tmpAllAssignmentIds = [];
    tmpAllAssignmentIds = await getAllAssignments(userId, courseId);
    const tmpCourseAssignmentIds = tmpAllAssignmentIds.userId
    setAllAssignmentIds(tmpAllAssignmentIds)
    setCourseAssignmentIds(tmpCourseAssignmentIds)

    // Retrieve rest of assignment data using assignment ids and then store it.
    let assignmentData = []
    if (tmpCourseAssignmentIds) {
      assignmentData = await Promise.all(tmpCourseAssignmentIds.map(async id => await getCourseAssignment(id)))
    }
    setAssignmentData(assignmentData)
  }, [userId, courseId])

  console.log(userId)
  console.log(allAssignmentIds)
  console.log(courseAssignmentIds)
  console.log(assignmentData)
  return (
    /** isRowLayout is used to set the assignments to column view, rather than row view. To test, change value to false. */
    <div className="flex-col h-full min-h-screen ml-16 bg-gray-800">

      <div className="fixed right-0">
        <button id="layoutToggle" onClick={() => toggleRowLayout(!isRowLayout)} className={`border-4 opacity-90 border-opacity-70 rounded-lg m-4 bg-blue-900 text-blue-300 hover:bg-blue-800 hover:text-green-300 hover:opacity-100 hover:border-opacity-100
            ${isRowLayout ? "border-yellow-300 hover:border-green-400" : "border-green-400 hover:border-yellow-300"}`}>
          {
            isRowLayout ?
              <svg className="mx-3 h-7 w-7" viewBox="0 0 20 20" fill="#FBBF24" stroke="currentColor" strokeWidth=".2" >
                <path d="M6.634,13.591H2.146c-0.247,0-0.449,0.201-0.449,0.448v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449v-2.692C7.083,13.792,6.881,13.591,6.634,13.591 M6.185,16.283h-3.59v-1.795h3.59V16.283zM6.634,8.205H2.146c-0.247,0-0.449,0.202-0.449,0.449v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V8.653C7.083,8.407,6.881,8.205,6.634,8.205 M6.185,10.897h-3.59V9.103h3.59V10.897z M6.634,2.819H2.146c-0.247,0-0.449,0.202-0.449,0.449V5.96c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V3.268C7.083,3.021,6.881,2.819,6.634,2.819 M6.185,5.512h-3.59V3.717h3.59V5.512z M15.933,5.683c-0.175-0.168-0.361-0.33-0.555-0.479l1.677-1.613c0.297-0.281,0.088-0.772-0.31-0.772H9.336c-0.249,0-0.448,0.202-0.448,0.449v7.107c0,0.395,0.471,0.598,0.758,0.326l1.797-1.728c0.054,0.045,0.107,0.094,0.161,0.146c0.802,0.767,1.243,1.786,1.243,2.867c0,1.071-0.435,2.078-1.227,2.837c-0.7,0.671-1.354,1.086-2.345,1.169c-0.482,0.041-0.577,0.733-0.092,0.875c0.687,0.209,1.12,0.314,1.839,0.314c0.932,0,1.838-0.173,2.673-0.505c0.835-0.33,1.603-0.819,2.262-1.449c1.322-1.266,2.346-2.953,2.346-4.751C18.303,8.665,17.272,6.964,15.933,5.683 M15.336,14.578c-1.124,1.077-2.619,1.681-4.217,1.705c0.408-0.221,0.788-0.491,1.122-0.812c0.97-0.929,1.504-2.168,1.504-3.485c0-1.328-0.539-2.578-1.521-3.516c-0.178-0.17-0.357-0.321-0.548-0.456c-0.125-0.089-0.379-0.146-0.569,0.041L9.769,9.327v-5.61h5.861l-1.264,1.216c-0.099,0.094-0.148,0.229-0.137,0.366c0.014,0.134,0.088,0.258,0.202,0.332c0.313,0.204,0.61,0.44,0.882,0.7c1.158,1.111,2.092,2.581,2.092,4.145C17.405,12.026,16.48,13.482,15.336,14.578"></path>
              </svg> :
              <svg className="mx-3 h-7 w-7" viewBox="0 0 20 20" fill="white" stroke="currentColor" strokeWidth=".2" >
                <path d="M6.634,13.591H2.146c-0.247,0-0.449,0.201-0.449,0.448v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449v-2.692C7.083,13.792,6.881,13.591,6.634,13.591 M6.185,16.283h-3.59v-1.795h3.59V16.283zM6.634,8.205H2.146c-0.247,0-0.449,0.202-0.449,0.449v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V8.653C7.083,8.407,6.881,8.205,6.634,8.205 M6.185,10.897h-3.59V9.103h3.59V10.897z M6.634,2.819H2.146c-0.247,0-0.449,0.202-0.449,0.449V5.96c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V3.268C7.083,3.021,6.881,2.819,6.634,2.819 M6.185,5.512h-3.59V3.717h3.59V5.512z M15.933,5.683c-0.175-0.168-0.361-0.33-0.555-0.479l1.677-1.613c0.297-0.281,0.088-0.772-0.31-0.772H9.336c-0.249,0-0.448,0.202-0.448,0.449v7.107c0,0.395,0.471,0.598,0.758,0.326l1.797-1.728c0.054,0.045,0.107,0.094,0.161,0.146c0.802,0.767,1.243,1.786,1.243,2.867c0,1.071-0.435,2.078-1.227,2.837c-0.7,0.671-1.354,1.086-2.345,1.169c-0.482,0.041-0.577,0.733-0.092,0.875c0.687,0.209,1.12,0.314,1.839,0.314c0.932,0,1.838-0.173,2.673-0.505c0.835-0.33,1.603-0.819,2.262-1.449c1.322-1.266,2.346-2.953,2.346-4.751C18.303,8.665,17.272,6.964,15.933,5.683 M15.336,14.578c-1.124,1.077-2.619,1.681-4.217,1.705c0.408-0.221,0.788-0.491,1.122-0.812c0.97-0.929,1.504-2.168,1.504-3.485c0-1.328-0.539-2.578-1.521-3.516c-0.178-0.17-0.357-0.321-0.548-0.456c-0.125-0.089-0.379-0.146-0.569,0.041L9.769,9.327v-5.61h5.861l-1.264,1.216c-0.099,0.094-0.148,0.229-0.137,0.366c0.014,0.134,0.088,0.258,0.202,0.332c0.313,0.204,0.61,0.44,0.882,0.7c1.158,1.111,2.092,2.581,2.092,4.145C17.405,12.026,16.48,13.482,15.336,14.578"></path>
              </svg>
          }
        </button>
      </div>

      <div className="fixed bottom-0 right-0 mb-2 mr-2">
        <FloatButton label="+" bgcolor="blue" url={`/courses/${courseId}/assignmentcreation`} isaddbtn={true} />
      </div>

      <div className={`ml-1 ${isRowLayout ? 'grid' : 'flex'}`}>
        <div className="p-4 mb-6 border-t-4 border-yellow-400" >
          <h1 className="px-2 pt-2 pb-6 text-xl text-yellow-400">Upcoming Assignments</h1>
          <ul className="border-4 border-gray-600 border-opacity-25">
            <div className="box-content flex p-4 bg-gray-700 border-2 border-t-0 border-green-400 border-opacity-50 hover:opacity-70">
              <div className="flex-1 pt-2 text-left">
                <p className="text-lg font-semibold text-gray-100">Assignment 2</p>
                <p className="pt-1 text-green-400 text-md">Submitted</p>
              </div>
              <div className="flex-1 pt-3 text-sm text-right">
                <p className="font-semibold text-pink-400">10/24/2021</p>
                <p className="text-gray-400 pt-0.5">11/1/2021</p>
              </div>
            </div>
            <div className="box-content flex p-4 bg-gray-700 border-2 border-t-0 border-red-400 border-opacity-50 hover:opacity-70">
              <div className="flex-1 pt-2 text-left">
                <p className="text-lg font-semibold text-gray-100">Assignment 3</p>
                <p className="pt-1 text-red-400 text-md">No Submission</p>
              </div>
              <div className="flex-1 pt-3 text-sm text-right">
                <p className="font-semibold text-pink-400">11/1/2021</p>
                <p className="text-gray-400 pt-0.5">11/8/2021</p>
              </div>
            </div>
            <div className="box-content flex p-4 bg-gray-700 border-2 border-t-0 border-yellow-400 border-opacity-50 hover:opacity-70">
              <div className="flex-1 pt-2 text-left">
                <p className="text-lg font-semibold text-gray-100">Midterm 1</p>
                <p className="pt-1 text-yellow-400 text-md">Opens 11/1/2021</p>
              </div>
              <div className="flex-1 pt-3 text-sm text-right">
                <p className="font-semibold text-pink-400">11/1/2021</p>
                <p className="text-gray-400 pt-0.5">11/1/2021</p>
              </div>
            </div>
          </ul>
        </div>
        <div className="p-4 mb-6 border-t-4 border-yellow-400" >
          <h1 className="px-2 pt-2 pb-6 text-xl text-yellow-400">Past Assignments</h1>
          <ul className="border-4 border-gray-600 border-opacity-25">
            <div className="box-content flex p-4 bg-gray-700 border-2 border-t-0 border-green-400 border-opacity-50 hover:opacity-70">
              <div className="flex-1 pt-2 text-left">
                <p className="text-lg font-semibold text-gray-100">Assignment 1</p>
                <p className="pt-1 font-bold text-green-400 text-md">30/40</p>
              </div>
              <div className="flex-1 pt-3 text-sm text-right">
                <p className="font-semibold text-pink-400">10/15/2021</p>
                <p className="text-gray-400 pt-0.5">10/22/2021</p>
              </div>
            </div>
            <div className="box-content flex p-4 bg-gray-700 border-2 border-t-0 border-green-400 border-opacity-50 hover:opacity-70">
              <div className="flex-1 pt-2 text-left">
                <p className="text-lg font-semibold text-gray-100">Quiz 1</p>
                <p className="pt-1 font-bold text-green-400 text-md">25/40</p>
              </div>
              <div className="flex-1 pt-3 text-sm text-right">
                <p className="font-semibold text-pink-400">10/24/2021</p>
                <p className="text-gray-400 pt-0.5">10/24/2021</p>
              </div>
            </div>
            <div className="box-content flex p-4 bg-gray-700 border-2 border-t-0 border-red-400 border-opacity-50 hover:opacity-70">
              <div className="flex-1 pt-2 text-left">
                <p className="text-lg font-semibold text-gray-100">Proof of Requisite</p>
                <p className="pt-1 text-red-400 text-md">Missing</p>
              </div>
              <div className="flex-1 pt-3 text-sm text-right">
                <p className="font-semibold text-pink-400">8/30/2021</p>
                <p className="text-gray-400 pt-0.5">8/30/2021</p>
              </div>
            </div>
          </ul>
        </div>

        <div className="p-4 mb-6 border-t-4 border-yellow-400" >
          <h1 className="px-2 pt-2 pb-6 text-xl text-yellow-400">Assignments from Database</h1>
          <ul className="border-4 border-gray-600 border-opacity-25">
            {assignmentData.length ? assignmentData.map(assignment =>
              <AssignmentButton
                name={assignment.assignmentName}
                issubmitted={assignment.assignmentSubmissions.find(submission => submission.id === userId).submission !== undefined}
                isgraded={assignment.studentPoints.find(submission => submission.id === userId).points !== undefined}
                duedate={assignment.dueDate}
                closedate={assignment.closeDate}
                opendate={assignment.openDate}
                pts={assignment.studentPoints.find(submission => submission.id === userId).points}
                posspts={assignment.totalPossiblePoints}
              />) : <></>}
            <AssignmentButton name="New Assignment" issubmitted={true} isgraded={true} isopen={true} duedate="11/1/2021" closedate="11/7/2021" pts="90" posspts="100" />
            <AssignmentButton name="New Assignment" issubmitted={false} isgraded={true} isopen={true} duedate="11/1/2021" closedate="-" pts="0" posspts="100" />
          </ul>
        </div>
      </div>
    </div>
  )
}

function AssignmentButton(props) {
  return (
    <div className={`box-content border-2 border-t-0 border-opacity-50 ${props.issubmitted ? "border-green-400" : "border-red-400"} bg-gray-700 p-4 flex hover:opacity-70`}>
      <div className="flex-1 pt-2 text-left">
        <p className="text-lg font-semibold text-gray-100">{props.name}</p>
        <div className={`text-md ${props.isopen ? (props.issubmitted ? "text-green-400" : "text-red-400") : "text-yellow-400"} pt-1`}>
          {props.isgraded ?
            <p className="font-bold">{props.pts + "/" + props.posspts}</p> :
            <p>{props.issubmitted ? "Submitted" : "No Submission"}</p>
          }
        </div>
      </div>
      <div className="flex-1 pt-3 text-sm text-right">
        <p className="font-semibold text-pink-400">{props.duedate}</p>
        <p className="text-gray-400 pt-0.5">{props.closedate}</p>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Assignments);