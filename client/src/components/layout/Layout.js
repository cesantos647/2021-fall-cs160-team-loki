import React from "react";
import Navbar from "./Navbar";
import CourseSidebar from "./CourseSidebar";

export default function Layout(props) {
  return (
    <div>
      <Navbar component={Navbar}/>
      <CourseSidebar component={CourseSidebar}/>
    </div>
  );
};