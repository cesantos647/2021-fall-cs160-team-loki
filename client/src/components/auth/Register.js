import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import Background from '../../images/towerhall.jpg';
import { data } from "autoprefixer";

const bgImage = {
  backgroundImage: `url(${Background})`
}

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };


    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div style={bgImage} className="grid w-screen h-screen bg-cover">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-full h-56 bg-gray-800 border-white rounded-r-md bg-opacity-95">
            <div className="grid p-4 text-4xl text-gray-100 truncate gap-y-4">
              <h1><b className="text-green-500">Better</b> Community.</h1>
              <h1><b className="text-green-500">Better</b> Education.</h1>
              <p className="text-sm break-words">Register now and get virtually connected to your school's resources.</p>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col justify-center col-start-10 col-end-12 bg-gray-800">
          <div className="mt-4 text-6xl text-center top-1">
            <h1 className="inline text-green-300">SAV</h1>
            <h1 className="inline text-white">NAC</h1>
          </div>
          <div className="my-auto">
            <label class="block pl-12 pb-4 text-2xl text-gray-200 text-sm mb-2" for="username">
              Register
            </label>
            <div className="px-12">
              <form noValidate onSubmit={this.onSubmit} className="">
                <div className="mb-4">
                  <label class="block text-gray-300 text-sm font-bold mb-2" for="username">
                    Name
                  </label>
                  <input
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                    id="name"
                    type="text"
                    className={classnames("shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", {
                      invalid: errors.name
                    })}
                  />
                  <span className="text-xs italic text-red-500">
                    {errors.name}
                    {errors.nameinputerror}
                  </span>
                </div>
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
                    className={classnames("shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", {
                      invalid: errors.email
                    })}
                  />
                  <span className="text-xs italic text-red-500">
                    {errors.email}
                    {errors.emailinputerror}
                  </span>
                </div>
                <div className="mb-4">
                  <label class="block text-gray-300 text-sm font-bold mb-2" for="username">
                    Password
                  </label>
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", {
                      invalid: errors.password
                    })}
                  />
                  <span className="text-xs italic text-red-500">
                    {errors.password}
                    {errors.passwordinputerror}
                  </span>
                </div>
                <div className="mb-4">
                  <label class="block text-gray-300 text-sm font-bold mb-2" for="username">
                    Confirm Password
                  </label>
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={classnames("shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", {
                      invalid: errors.password2
                    })}
                  />
                  <span className="text-xs italic text-red-500">
                    {errors.password2}
                    {errors.password2inputerror}
                  </span>
                </div>
                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                    Sign up
                  </button>
                </div>
              </form>
              <div className="flex justify-center mt-4 text-blue-600">
                <Link to="/" className="btn">
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));