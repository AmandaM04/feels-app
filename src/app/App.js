import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';

import './App.css';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: {
              from: props.location
            } }}
          />
        )
      }
    />
  );
};

import Home from '../components/Home/Home';
// import Login from '../components/Login/Login';
// import Register from '../components/Register/Register';
import Parent from '../components/Parent/Parent';
// import Children from '../components/Children/Children';
// import Records from '../components/Records/Records'

class App extends Component {
  state = {
    authed: false,
  }
  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar />
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path="/" exact component={Home}/>
                  <PrivateRoute
                    path="/profile"
                    authed={this.state.authed}
                    component={Parent} />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
