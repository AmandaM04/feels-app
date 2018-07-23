import React from 'react';

import userRequests from '../../firebaseRequests/user';
import childrenRequests from '../../firebaseRequests/children';
import authRequest from '../../firebaseRequests/auth';

// import NameChangeForm from '../NameChangeForm/NameChangeForm';
// import firebase from 'firebase';
// import User from '../User/User';

import './Profile.css';

class Profile extends React.Component {
  state = {
    user: [],
    children: {},
    // visible: false,
  }

  // show () {
  //   this.setState({ visible: true });
  // }

  // hide () {
  //   this.setState({ visible: false });
  // }

  saveUser = (e) => {
    userRequests.postUser()
      .then((user) => {
        this.setState({ user });
      });
  };

  // updateUser = () => {
  //   const firebaseId = this.props.match.params.id;
  //   userRequests
  //     .putUser(firebaseId, this.state.saveUser)
  //     .then(() => {
  //       this.props.history.push('/profile');
  //     })
  //     .catch((error) => {
  //       console.error(error.message);
  //     });
  // };

  removeChild = () => {

  }

  componentDidMount () {
    userRequests
      .getUsers(authRequest.getUid())
      .then((user) => {
        this.setState({ user: user[0] });
        childrenRequests
          .getChildren()
          .then((children) => {
            this.setState({ children });
          });
      })
      .catch(((error) => {
        console.error(error.message);
      }));
  }

  render () {
    const { user, children } = this.state;

    return (
      <div className="container">
        <div className="row">
          <h1>Profile</h1>
          <div className="user-details">
            <form onSubmit={this.saveUser}>
              <h3>User Details</h3>
              <div className="parent">
                <h4>Name:</h4>
                <div>{user.name}</div>
                <button className="btn btn-default glyphicon glyphicon-edit"></button>
              </div>
              <div className="update-field">
                <input type="text" />
                <button>Save</button>
              </div>
            </form>
          </div>
          <div className="childrens">
            <h3>Child/ren Details</h3>
            <div className="child-container">
              <div className="row">
                <div>{children.name}</div>
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
