import React from 'react';

import './Home.css';

class Home extends React.Component {
  render () {
    return (
      <div className="Home">
        <div className="feels-app">
          <h1 className="title">FeelsApp</h1>
          <h2 className="tagline">New innovative way to record symptoms, track medications, and monitor patient's temperatures.</h2>
        </div>
      </div>
    );
  }
}

export default Home;
