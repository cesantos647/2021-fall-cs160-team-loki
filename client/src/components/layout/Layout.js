import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import CourseSidebar from "./CourseSidebar";

const Layout = (props) => (
  <div>
    <Navbar component={Navbar} />
    <CourseSidebar component={CourseSidebar} />
  </div>
);

Layout.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Layout);