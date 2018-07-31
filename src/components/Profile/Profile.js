import React from 'react';
import firebase from 'firebase';

import userRequests from '../../firebaseRequests/user';
import childrenRequests from '../../firebaseRequests/children';
import authRequest from '../../firebaseRequests/auth';

import ChildComp from '../Children/Children';

import './Profile.css';

class Profile extends React.Component {

  state = {
    user: [],
    children: [],
    isHiddenParent: true,
    isHiddenChild: true,
  }

  toggleHiddenParent = () => {
    this.setState({
      isHiddenParent: !this.state.isHiddenParent,
    });
  }

  toggleHiddenChild = () => {
    this.setState({
      isHiddenChild: !this.state.isHiddenChild,
    });
  }

  updateUser = () => {
    const firebaseId = this.state.user.id;
    const updatedUser = {
      name: this.state.input,
      uid: authRequest.getUid(),
    };
    userRequests
      .putUser(firebaseId, updatedUser)
      .then(() => {
        userRequests
          .getUsers(authRequest.getUid())
          .then((user) => {
            this.setState({ user: user[0] });
          });
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  getInitialState = () => {
    return { input: '' };
  }

  handleInputChange = (e) => {
    this.setState({ input: e.target.value });
  }

  removeChild = (key) => {
    const children = [...this.state.children];
    firebase.database().ref('children').child(key).remove();
    const filteredChildren = children.filter((child) => {
      return child.id !== key;
    });
    this.setState({ children: filteredChildren });
  }

  addChild = () => {
    const newChild = {
      name: this.state.input,
      uid: authRequest.getUid(),
    };
    childrenRequests
      .postChild(newChild)
      .then(() => {
        childrenRequests
          .getChildren(authRequest.getUid())
          .then((children) => {
            this.setState({ children: children });
          });
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

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

    const UpdateParentName = () => (
      <div className="parentUpdateField" >
        <input type="text" onChange={this.handleInputChange} />
        <button onClick={this.updateUser}>Save</button>
      </div>
    );

    const AddNewChildName = () => (
      <div className="newChildField" >
        <input type="text" onChange={this.handleInputChange} />
        <button onClick={this.addChild}>Save</button>
      </div>
    );

    return (
      <div className="container">
        <div className="row">
          <h1>Profile</h1>
          <div className="userDetails">
            <h3>User Details</h3>
            <div className="parent">
              {/* <h4>Name:</h4> */}
              <h4>{user.name}</h4>
              <button onClick={this.toggleHiddenParent} type="button" class="btn btn-default btn-secondary">Edit</button>
            </div>
            {!this.state.isHiddenParent ? UpdateParentName() : ''}
          </div>
          <div className="childrens">
            <div className="childContainer">
              <h3>Child/ren Details</h3>
              <div className="row">
                <button onClick={this.toggleHiddenChild} className="btn btn-secondary glyphicon glyphicon-plus" alt="add new"></button>
              </div>
              {!this.state.isHiddenChild ? AddNewChildName() : ''}
              <div>
                <div>{childrenComponents}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
