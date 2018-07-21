import React from 'react';

import userRequests from '../../firebaseRequests/user';
import authRequest from '../../firebaseRequests/auth';

// import firebase from 'firebase';
// import User from '../User/User';

import './Profile.css';

class Profile extends React.Component {
  state = {
    user: [],
    children: [],
  }

  saveUser = (e) => {
    userRequests.postUser()
      .then((user) => {
        this.setState({ user });
      });
  };

  removeChild = () => {

  }

  componentDidMount () {
    userRequests
      .getUsers(authRequest.getUid())
      .then((user) => {
        this.setState({ user });
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  render () {
    // const user = (uid, name) =>
    //   (`user/${uid}`).set ({
    //     name,
    //   });
    const { user } = this.state;
    // {
    //   // return (
    //   //   <User
    //   //     key={user.id}
    //   //     details={user}
    //   //     value={firebase.auth().currentUser.name}
    //   //   />
    //   // );
    // });
    return (
      <div className="container">
        <div className="row">
          <h1>Profile</h1>
          <div className="user-details">
            <form onSubmit={this.saveUser}>
              <h3>User Details</h3>
              <div className="parent">
                <h4>Name</h4>
                <input {...user} type="text" />
              </div>
              <div>
                <button>Save</button>
              </div>
            </form>
          </div>
          <div className="childrens">
            <h3>Child/ren Details</h3>
            <div className="child-container">
              <div className="row">
                {/* {childrenComponents} */}
              </div>
            </div>
            {/* <input type="text" /> */}
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
