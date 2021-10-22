import React, { Component } from "react";
import { Link } from "react-router-dom";
import Background from '../../images/towerhall.jpg';

const bgImage = {
  backgroundImage: `url(${Background})`
}

class Landing extends Component {
  render() {
    return (
        <div style={bgImage} className="bg-tower-hall bg-cover h-screen w-screen grid grid-cols-12">
          <div className="flex col-start-1 col-end-5 items-center">
            <div className="flex bg-blue-900 w-full h-1/5 justify-center items-center border border-opacity-80 border-white">
              <div className="grid gap-y-4 p-4 text-3xl text-white truncate">
                <h1><b className="text-green-300">Better</b> Community.</h1>
                <h1><b className="text-green-300">Better</b> Education.</h1>
                <p className="text-sm">Register and get virtually connected to your school's resources.</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center col-start-10 col-end-13 bg-gray-50">
            <div className="text-6xl">
              <h1 className="inline text-green-300">SAV</h1>
              <h1 className="inline text-blue-900">NAC</h1>
            </div>
          </div>
        </div>
    );
  }
}

export default Landing;