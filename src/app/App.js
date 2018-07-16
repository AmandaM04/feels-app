import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';

import './App.css';

import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Parent from '../components/Parent/Parent';
import Children from '../components/Children/Children';
import Records from '../components/Records/Records'

class App extends Component {
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
