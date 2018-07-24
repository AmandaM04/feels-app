import React from 'react';

import userRequests from '../../firebaseRequests/user';
import childrenRequests from '../../firebaseRequests/children';
import authRequest from '../../firebaseRequests/auth';

import ChildComp from '../Children/Children';

import './Profile.css';

class Profile extends React.Component {
  state = {
    user: [],
    children: [],
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

  removeChild = (key) => {
    const newChild = { ...this.state.children };
    delete newChild[key];
    this.setState({ children: newChild });
  }

  // addChild = () => {
  // }

  componentDidMount () {
    userRequests
      .getUsers(authRequest.getUid())
      .then((user) => {
        this.setState({ user: user[0] });
        childrenRequests
          .getChildren(authRequest.getUid())
          .then((children) => {
            this.setState({ children: children });
          });
      })
      .catch(((error) => {
        console.error(error.message);
      }));
  }

  render () {
    const { user } = this.state;
    const childrenComponents = this.state.children.map((child) => {
      return (
        <ChildComp
          key={child.id}
          details={child}
          removeChild={this.removeChild}
        />
      );
    });
    const xClickFunction = (key) => {
      this.props.removeChild(key);
    };

    return (
      <div className="container">
        <div className="row">
          <h1>Profile</h1>
          <div className="user-details">
            <form onSubmit={this.saveUser}>
              <h3>User Details</h3>
              <div className="parent">
                <h3>Name:</h3>
                <div>{user.name}</div>
                <button className="btn btn-default glyphicon glyphicon-edit"></button>
              </div>
              <div className="parentUpdateField hide">
                <input type="text" />
                <button>Save</button>
              </div>
            </form>
          </div>
          <div className="childrens">
            <form action="">
              <h3>Child/ren Details</h3>
              <div className="child-container">
                <div className="row">
                  <div>{childrenComponents}</div>
                  <button className="btn btn-default glyphicon glyphicon-trash" alt="delete" onClick={xClickFunction}></button>
                </div>
                <div>
                  <button className="btn btn-default glyphicon glyphicon-plus" alt="add new"></button>
                </div>
                <div className="childUpdateField hide">
                  <input type="text" />
                  <button>Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
