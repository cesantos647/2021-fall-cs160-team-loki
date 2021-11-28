import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const CourseSidebar = (props) => {
  const [showSidebar, toggleSidebar] = useState(false)
  const { courseId } = useParams();

  return (
    <div className="fixed z-40 items-center ml-12 align-middle">
      <Sidebar showsidebar={showSidebar} courseid={courseId===undefined ? 404 : courseId} />
      <aside className="flex items-center h-screen align-middle">
        <button onClick={() => toggleSidebar(!showSidebar)} className="fixed block w-10 h-10 overflow-hidden text-gray-700 bg-gray-900 border-2 border-gray-700 rounded-full hover:border-yellow-200">
          {
            showSidebar ?
              <svg
                className="w-6 h-7"
                viewBox="0 0 12 20"
                fill="yellow"
                stroke="currentColor"
                strokeWidth="0.5">
                <path d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
              </svg> :
              <svg
                className="w-6 h-7"
                viewBox="0 0 10 20"
                fill="yellow"
                stroke="currentColor"
                strokeWidth="0.5">
                <path d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
              </svg>
          }
        </button>
      </aside>
    </div >
  );
}

function Sidebar(props) {

  if (!props.showsidebar) {
    return null;
  }

  return (
    <aside className="fixed h-screen mx-5 bg-gray-900 border-l-2 border-r-2 border-gray-700 shadow">
      <div className="grid h-full grid-flow-row grid-rows-2">
        <div className="">
          <div className="relative h-10 align-top border-b-2 border-gray-700 bg-gradient-to-r from-yellow-300 to-yellow-100">
            <aside className="flex justify-center">
              <button id="courseSettings" className="relative block w-10 h-10 mx-0 overflow-hidden text-gray-900 bg-yellow-200 border-2 border-gray-700 rounded-full top-5 hover:text-yellow-200 hover:bg-gray-900">
                <svg
                  className="w-8 h-6"
                  viewBox="0 0 20 26"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path
                    fill="#111827"
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1
                    0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0
                    0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2
                    2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0
                    0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1
                    0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0
                    0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65
                    0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0
                    1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0
                    1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2
                    0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0
                    1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0
                    2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0
                    0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65
                    1.65 0 0 0-1.51 1z"></path>
                  <circle fill="#FDE68A" cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </aside>
          </div>
          <ul className="pt-6 pl-4 pr-10">
            <CoursePageLink name="Modules" url={`/courses/${props.courseid}/modules`} />
            <CoursePageLink name="Announcements" url={`/courses/${props.courseid}/announcements`} />
            <div className="animate-pulse">
              <CoursePageLink name="Assignments" url={`/courses/${props.courseid}/assignments`} />
            </div>
            <CoursePageLink name="Grades" url={`/courses/${props.courseid}/grades`} />
            <CoursePageLink name="Files" url={`/courses/${props.courseid}/files`} />
            <CoursePageLink name="Syllabus" url={`/courses/${props.courseid}/syllabus`} />
          </ul>
        </div>

        <div className="font-sans font-semibold border-t-2 border-gray-700">
          <aside className="flex justify-end">
            <a
              href={`/courses/${props.courseid}/chatcreation`}
              id="addChat" className="relative w-10 h-10 font-serif text-3xl font-bold text-center text-gray-900 border-b-2 border-l-2 border-gray-700 hover: rounded-bl-md bg-gradient-to-r from-green-500 to-green-300 hover:text-yellow-100">
              +
            </a>
          </aside>

          <h2 className="px-4 pb-1 text-sm text-green-400"> GENERAL </h2>
          <ul className="pl-6">
            <CourseChatLink name="general" url={`/courses/${props.courseid}/chat`} />
            <CourseChatLink name="homework" url={`/courses/${props.courseid}/chat`} />
            <CourseChatLink name="seminar-discussion" url={`/courses/${props.courseid}/chat`} />
            <CourseChatLink name="off-topic" url={`/courses/${props.courseid}/chat`} />
          </ul>
          <h2 className="px-4 pt-4 pb-1 text-sm text-green-400"> OTHER </h2>
          <ul className="pl-6">
            <CourseChatLink name="welcome" url={`/courses/${props.courseid}/chat`} />
            <CourseChatLink name="rules" url={`/courses/${props.courseid}/chat`} />
            <CourseChatLink name="bot-commands" url={`/courses/${props.courseid}/chat`} />
          </ul>
          <h2 className="px-4 pt-4 pb-1 text-sm text-green-400"> CHATS FROM DB </h2>
          <ul className="pl-6">
          </ul>
        </div>
      </div>
    </aside>
  )
}

function CoursePageLink(props) {
  return (
    <li className="py-2 font-sans text-xl text-yellow-200 font-extralight">
      <a
        href={`${props.url}`}
        className="focus:text-gray-200 hover:text-green-300">
        {props.name}
      </a>
    </li>
  )
}


function CourseChatLink(props) {
  return (
    <li className="py-0.5 text-xs text-gray-100 text-opacity-75">
      <a
        href={`${props.url}`}
        className="focus:text-white focus:text-opacity-100 hover:text-green-300 hover:text-opacity-100">
        {"# " + props.name}
      </a>
    </li>
  )
}

CourseSidebar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
)(CourseSidebar);