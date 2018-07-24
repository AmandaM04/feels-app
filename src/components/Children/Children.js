import React from 'react';

import './Children.css';

class ChildComp extends React.Component {
  render () {
    const {details} = this.props;
    return (
      <div className="children">
        <h2 className="child-name">{details.name}</h2>
      </div>
    );
  }
}

export default ChildComp;
