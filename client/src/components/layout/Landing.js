import React, { Component } from "react";
import { Link } from "react-router-dom";
import Background from '../../images/towerhall.jpg';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

const bgImage = {
  backgroundImage: `url(${Background})`
}

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

componentDidMount() {
  // If logged in and user navigates to Login page, should redirect them to dashboard
  if (this.props.auth.isAuthenticated) {
    this.props.history.push("/dashboard");
  }
}

componentWillReceiveProps(nextProps) {
  if (nextProps.auth.isAuthenticated) {
    this.props.history.push("/dashboard"); // push user to dashboard when they login
  }

if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

onSubmit = e => {
    e.preventDefault();

const userData = {
      email: this.state.email,
      password: this.state.password
    };

this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
};
  render() {
    const { errors } = this.state;

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
          <div className="grid grid-rows-3 col-start-10 col-end-13 bg-gray-50">
            <div className="flex text-6xl justify-center">
              <h1 className="inline text-green-300">SAV</h1>
              <h1 className="inline text-blue-900">NAC</h1>
            </div>
            <div className="flex justify-center">
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
    );
  }
}

Landing.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Landing);