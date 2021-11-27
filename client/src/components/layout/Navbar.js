import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import FloatButton from "./FloatButton";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  render() {
    const userId = this.props.auth;
    console.log(userId);
    return (
      <div className="bg-gray-700">
        <aside className="fixed z-30 grid h-full grid-rows-1 text-yellow-400 bg-blue-900 border-r-2 border-gray-700 shadow">
          <div className="overflow-y-auto">
            <div className="flex items-center w-full h-16 animate-bounce">
              <img
                id="logo"
                className="mx-auto h-14 w-14"
                src="https://i.imgur.com/7lqNQBX.png"
                alt="savnac logo" />
            </div>
            <ul className="">
              <PageButton id="dashboard" url="/dashboard" icon={
                <svg
                  className="h-7 w-14 animate-pulse" viewBox="-5 0 20 20" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M16.557,4.467h-1.64v-0.82c0-0.225-0.183-0.41-0.409-0.41c-0.226,0-0.41,0.185-0.41,0.41v0.82H5.901v-0.82c0-0.225-0.185-0.41-0.41-0.41c-0.226,0-0.41,0.185-0.41,0.41v0.82H3.442c-0.904,0-1.64,0.735-1.64,1.639v9.017c0,0.904,0.736,1.64,1.64,1.64h13.114c0.904,0,1.64-0.735,1.64-1.64V6.106C18.196,5.203,17.461,4.467,16.557,4.467 M17.377,15.123c0,0.453-0.366,0.819-0.82,0.819H3.442c-0.453,0-0.82-0.366-0.82-0.819V8.976h14.754V15.123z M17.377,8.156H2.623V6.106c0-0.453,0.367-0.82,0.82-0.82h1.639v1.23c0,0.225,0.184,0.41,0.41,0.41c0.225,0,0.41-0.185,0.41-0.41v-1.23h8.196v1.23c0,0.225,0.185,0.41,0.41,0.41c0.227,0,0.409-0.185,0.409-0.41v-1.23h1.64c0.454,0,0.82,0.367,0.82,0.82V8.156z"></path>
                </svg>}
              />

              <PageButton id="notifications" url="/notifications" icon={
                <svg
                  className="h-7 w-14" width="24" height="24" viewBox="-5 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>}
              />

              <PageButton id="files" url="/files" icon={
                <svg
                  className="h-7 w-14" viewBox="-5 0 20 20" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M17.927,5.828h-4.41l-1.929-1.961c-0.078-0.079-0.186-0.125-0.297-0.125H4.159c-0.229,0-0.417,0.188-0.417,0.417v1.669H2.073c-0.229,0-0.417,0.188-0.417,0.417v9.596c0,0.229,0.188,0.417,0.417,0.417h15.854c0.229,0,0.417-0.188,0.417-0.417V6.245C18.344,6.016,18.156,5.828,17.927,5.828 M4.577,4.577h6.539l1.231,1.251h-7.77V4.577z M17.51,15.424H2.491V6.663H17.51V15.424z"></path>
                </svg>}
              />

              <PageButton id="settings" url="/settings" icon={
                <svg
                  className="h-7 w-14" width="24" height="24" viewBox="-5 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>}
              />
            </ul>

            <div id="logout" className="items-center w-full h-16 mt-auto">
              <button
                onClick={this.onLogoutClick}
                className="items-center justify-center w-full h-16 hover:bg-yellow-400 focus:outline-none animate-pulse">
                <svg
                  className="text-red-500 h-7 w-14 focus:text-gray-100" width="24" height="24" viewBox="-5 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path> <polyline points="16 17 21 12 16 7"></polyline> <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>

          <div className="overflow-y-auto">
            <ul>
              <div className="animate-pulse">
                <FloatButton label="+" bgcolor="bg-gray-900" url="/coursecreation" isaddbtn={true} />
              </div>
              <FloatButton label="CS 185C" bgcolor="bg-indigo-500" url="/courses/:courseid/chat" />
              <FloatButton label="CS 157A" bgcolor="bg-pink-500" url="/courses/:courseid/chat" />
              <FloatButton label="CS 160" bgcolor="bg-purple-500" url="/courses/:courseid/chat" isselected={true} />
            </ul>
          </div>
        </aside>
      </div>
    );
  }
}

function PageButton(props) {
  return (
    <li className="hover:bg-yellow-400 hover:text-blue-900">
      <a
        href={props.url}
        className="items-center justify-center w-full h-16 px-5 focus:text-gray-100">
        {props.icon}
      </a>
    </li>
  )
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);