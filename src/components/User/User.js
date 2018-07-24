import React from 'react';

import './User.css';

class User extends React.Component {
  render () {
    const {user} = this.props;
    return (
      <div className="parent">
        <h2 className="parent-name">{user.name}</h2>
      </div>
    );
  }
};

export default User;
