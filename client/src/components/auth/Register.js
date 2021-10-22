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
    <div style={bgImage} className="bg-tower-hall bg-cover h-screen w-screen grid grid-cols-12">
      <div className="flex col-start-1 col-end-5 items-center">
        <div className="flex bg-blue-900 w-full h-56 justify-center items-center border border-opacity-80 border-white">
          <div className="grid gap-y-4 p-4 text-3xl text-white truncate">
            <h1><b className="text-green-300">Better</b> Community.</h1>
            <h1><b className="text-green-300">Better</b> Education.</h1>
            <p className="text-sm">Register and get virtually connected to your school's resources.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col relative justify-center col-start-10 col-end-13 bg-gray-50">
        <div className="absolute top-0 right-1/4 text-6xl items-center">
          <h1 className="inline text-green-300">SAV</h1>
          <h1 className="inline text-blue-900">NAC</h1>
        </div>
        <label class="block pl-12 text-2xl text-gray-700 text-sm mb-2" for="username">
          Register
        </label>
        <div className="px-12">
          <form noValidate onSubmit={this.onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
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
              <span className="text-red-500 text-xs italic">
                {errors.name}
                {errors.nameinputerror}
                </span>
            </div>
            <div className="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
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
              <span className="text-red-500 text-xs italic">
                {errors.email}
                {errors.emailinputerror}
                </span>
            </div>
            <div className="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
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
              <span className="text-red-500 text-xs italic">
                {errors.password}
                {errors.passwordinputerror}
                </span>
            </div>
            <div className="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
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
              <span className="text-red-500 text-xs italic">{errors.password2}</span>
            </div>
            <div className="mt-8">
              <button 
                type="submit"
                className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                Sign up
              </button>
            </div>
          </form>
          <Link to="/" className="btn">
            Back to login
          </Link>
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