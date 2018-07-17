import React from 'react';
import { Link } from 'react-router-dom';

import authRequests from '../../firebaseRequests/auth';

import './Login.css';

class Login extends React.Component {
  state = {
    user: {
      email: 'amandamitchell8615@gmail.com',
      password: 'Am8810330!',
    },
  };

  loginClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authRequests
      .loginUser(user)
      .then(() => {
        this.props.history.push('/records');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  emailChange = e => {
    const tempUser = {...this.state.user};
    tempUser.email = e.target.value;
    this.setState({user: tempUser});
  };

  passwordChange = e => {
    const tempUser = {...this.state.user};
    tempUser.email = e.target.value;
    this.setState({user: tempUser});
  };

  render () {
    const { user } = this.state;
    return (
      <div className="login">
        <div id="login-form">
          <h1 className="text-center">Login</h1>
          <form className="form-horizontal col-xs-6 col-xs-offset-3">
            <div className="form-group">
              <label htmlFor="inputEmail" className="col-xs-4 control-label">
                Email:
              </label>
              <div className="col-xs-8">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  value={user.email}
                  onChange={this.emailChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword" className="col-xs-4 control-label">
                Password:
              </label>
              <div className="col-xs-8">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  value={user.password}
                  onChange={this.passwordChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12 text-center">
                <Link to="/register">Need to Register?</Link>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
                <button
                  type="submit"
                  className="btn btn-default col-xs-12"
                  onClick={this.loginClickEvent}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
