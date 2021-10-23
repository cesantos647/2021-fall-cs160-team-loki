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
        <div style={bgImage} className="bg-cover h-screen w-screen grid grid-cols-12">
          <div className="flex col-start-1 col-end-5 items-center">
            <div className="flex bg-gray-800 bg-opacity-95 rounded-md w-full h-56 justify-center items-center border-white">
              <div className="grid gap-y-4 p-4 text-4xl text-gray-100 truncate">
                <h1><b className="text-green-500">Better</b> Community.</h1>
                <h1><b className="text-green-500">Better</b> Education.</h1>
                <p className="text-sm">Register now and get virtually connected to your school's resources.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col relative justify-center col-start-10 col-end-13 bg-gray-800">
            <div className="absolute top-4 right-1/4 text-6xl items-center">
              <h1 className="inline text-green-300">SAV</h1>
              <h1 className="inline text-white">NAC</h1>
            </div>
            <div>
            <label class="block pl-12 pb-4 text-2xl text-gray-200 text-sm mb-2" for="username">
              Sign in
            </label>
            </div>
            <div className="px-12">
              <form noValidate onSubmit={this.onSubmit}>
                <div className="mb-4">
                  <label class="block text-gray-300 text-sm font-bold mb-2" for="username">
                    Email
                  </label>
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("shadow appearance-none border bg-gray-200 focus:bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", {
                      invalid: errors.email || errors.emailnotfound
                    })}
                  />
                  <span className="text-red-500 text-xs italic">
                    {errors.email}
                    {errors.emailnotfound}
                    {errors.emailinputerror}
                  </span>
                </div>
                <div className="">
                  <label class="block text-gray-300 text-sm font-bold mb-2" for="username">
                    Password
                  </label>
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("shadow appearance-none border bg-gray-200 focus:bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", {
                      invalid: errors.password || errors.passwordincorrect
                    })}
                  />
                  <span className="text-red-500 text-xs italic">
                    {errors.password}
                    {errors.passwordincorrect}
                    {errors.passwordinputerror}
                  </span>
                </div>
                <div className="mt-8">
                  <button
                    type="submit"
                    className="bg-blue-700 w-full hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                    Login
                  </button>
                </div>
                <div className="flex my-2 italic text-gray-200 justify-center">
                  <p>- or -</p>
                </div>
                <div className="flex">
                  <Link
                    to="/register"
                    className="bg-green-700 w-full hover:bg-green-900 text-white text-center font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                      Register
                  </Link>
                </div>
              </form>
              <span className="text-red-500 text-xs italic">
                {errors.inputerror}
              </span>
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