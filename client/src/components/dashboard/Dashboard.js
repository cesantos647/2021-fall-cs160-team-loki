import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

render() {
    const { user } = this.props.auth;

return (
      <div className="w-screen h-screen bg-gray-800 center">
        <div className="ml-20 row">
          <div className="col s12">
            <h4>
              <div className="text-green-400">Hey there,
              <span className="font-bold text-yellow-300">{" " + user.name.split(" ")[0]}</span>
              </div>
              <p className="text-white flow-text grey-text">
                You are currently on the dashboard. 
                <span className="font-bold text-red-500"> (IN PROGRESS)</span>
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="bg-blue-800 rounded-lg hover:bg-red-500">
                <h1 class="break-words p-1 text-normal text-center text-bold text-yellow-300 hover:text-white">Logout</h1>
            </button>
          </div>
        </div>
        
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);