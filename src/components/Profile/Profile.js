import React from 'react';

import './Profile.css';

class Profile extends React.Component {

  saveButton = (e) => {

  }

  removeChild = () => {

  }

  render () {
    return (
      <div className="profile">
        <div className="row">
          <h1>Profile</h1>
          <div className="user-details">
            <h3>User Details</h3>
            <div className="parent">
              <h4>Username</h4>
              <input type="text" />
              <h4>Name</h4>
              <input type="text" />
            </div>
            <div>
              <button>Save</button>
            </div>
          </div>
          <div className-="chld-name">
            <h3>Child Details</h3>
            <div className="children">
              <h4>Kid/s</h4>
              <input type="text" />
            </div>
            <div>
              <button>Add New</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
