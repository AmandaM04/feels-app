import React from 'react';

import './Home.css';

class Home extends React.Component {
  render () {
    return (
      <div className="Home">
        <div className="feels-app">
          <h1>FeelsApp</h1>
          <h3 className="tagline">Keeping up with temperatures and medication at the palm of your hand!</h3>
        </div>
      </div>
    );
  }
}

export default Home;
