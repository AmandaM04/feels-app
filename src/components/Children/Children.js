import React from 'react';

import './Children.css';

class Children extends React.Component {
  render () {
    const {children} = this.props;
    return (
      <div className="children">
        <h2 className="child-name">{children.name}</h2>
      </div>
    );
  }
}

export default Children;
