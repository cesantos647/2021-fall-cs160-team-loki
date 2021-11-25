import React, { Component } from "react";
import { connect } from "react-redux";

class CourseSidebar extends Component {

  constructor(props) {
    super(props);
    this.state = { showSidebar: false }
    this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
  }

  handleSidebarToggle() {
    this.setState(prevState => ({
      showSidebar: !prevState.showSidebar
    }));
  }

  render() {
    return (
      <div class="ml-12 fixed items-center align-middle z-40">
        <Sidebar sidebar={this.state.showSidebar} />
        <aside class="flex items-center align-middle h-screen">
          <button onClick={this.handleSidebarToggle} class="fixed block h-10 w-10 rounded-full overflow-hidden border-2 border-gray-700 text-gray-700 bg-gray-900 hover:border-yellow-200 animate-spin">
            {
              this.state.showSidebar ?
                <svg
                  class="h-7 w-6"
                  viewBox="0 0 12 20"
                  fill="yellow"
                  stroke="currentColor"
                  stroke-width="0.5">
                  <path d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
                </svg> :
                <svg
                  class="h-7 w-6"
                  viewBox="0 0 10 20"
                  fill="yellow"
                  stroke="currentColor"
                  stroke-width="0.5">
                  <path d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
                </svg>
            }
          </button>
        </aside>
      </div >
    );
  }
}

function Sidebar(props) {
  if (!props.sidebar) {
    return null;
  }

  return (
    <aside class="mx-5 fixed border-l-2 border-r-2 border-gray-700 bg-gray-900 shadow h-screen">
      <div class="h-full grid grid-flow-row grid-rows-2">
        <div class="">
          <div class="relative h-10 align-top border-b-2 border-gray-700 bg-gradient-to-r from-yellow-300 to-yellow-100">
            <aside class="flex justify-center">
              <button id="courseSettings" class="mx-0 relative block top-5 h-10 w-10 rounded-full overflow-hidden border-2 border-gray-700 text-gray-900 bg-yellow-200 hover:text-yellow-200 hover:bg-gray-900">
                <svg
                  class="h-6 w-8"
                  viewBox="0 0 20 26"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round">
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
          <ul class="pl-4 pr-10 pt-6">
            <CoursePageLink name="Modules" url="/courses/:courseid/modules" />
            <CoursePageLink name="Announcements" url="/courses/:courseid/announcements" />
            <div class="animate-pulse">
              <CoursePageLink name="Assignments" url="/courses/:courseid/assignments" />
            </div>
            <CoursePageLink name="Grades" url="/courses/:courseid/grades" />
            <CoursePageLink name="Files" url="/courses/:courseid/files" />
            <CoursePageLink name="Syllabus" url="/courses/:courseid/syllabus" />
          </ul>
        </div>

        <div class="font-sans font-semibold border-t-2 border-gray-700">
          <aside class="flex justify-end">
            <a
              href="/courses/:courseid/chatcreation"
              id="addChat" class="relative text-3xl font-bold font-serif h-10 w-10 hover: text-center rounded-bl-md border-b-2 border-l-2 border-gray-700 text-gray-900 bg-gradient-to-r from-green-500 to-green-300 hover:text-yellow-100">
              +
            </a>
          </aside>

          <h2 class="text-sm px-4 pb-1 text-green-400"> GENERAL </h2>
          <ul class="pl-6">
            <CourseChatLink name="general" url="/courses/:courseid/chat" />
            <CourseChatLink name="homework" url="/courses/:courseid/chat" />
            <CourseChatLink name="class-discussion" url="/courses/:courseid/chat" />
            <CourseChatLink name="off-topic" url="/courses/:courseid/chat" />
          </ul>
          <h2 class="text-sm px-4 pt-4 pb-1 text-green-400"> OTHER </h2>
          <ul class="pl-6">
            <CourseChatLink name="welcome" url="/courses/:courseid/chat" />
            <CourseChatLink name="rules" url="/courses/:courseid/chat" />
            <CourseChatLink name="bot-commands" url="/courses/:courseid/chat" />
          </ul>
          <h2 class="text-sm px-4 pt-4 pb-1 text-green-400"> CHATS FROM DB </h2>
          <ul class="pl-6">
          </ul>
        </div>
      </div>
    </aside>
  )
}

function CoursePageLink(props) {
  return (
    <li class="py-2 text-yellow-200 text-xl font-extralight font-sans">
      <a
        href={`${props.url}`}
        class="focus:text-gray-200 hover:text-green-300">
        {props.name}
      </a>
    </li>
  )
}


function CourseChatLink(props) {
  return (
    <li class="py-0.5 text-xs text-gray-100 text-opacity-75">
      <a
        href={`${props.url}`}
        class="focus:text-white focus:text-opacity-100 hover:text-green-300 hover:text-opacity-100">
        {"# " + props.name}
      </a>
    </li>
  )
}

export default connect(
)(CourseSidebar);