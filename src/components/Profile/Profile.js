import React from 'react';
// import firebase from 'firebase';

import userRequests from '../../firebaseRequests/user';
import childrenRequests from '../../firebaseRequests/children';
import authRequest from '../../firebaseRequests/auth';

import ChildComp from '../Children/Children';

import './Profile.css';

class Profile extends React.Component {
  state = {
    user: [],
    children: [],
    isHidden: true,
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  saveUser = (e) => {
    userRequests.postUser()
      .then((user) => {
        this.setState({ user });
      });
  };

  updateUser = () => {
    const firebaseId = this.state.user.id;
    const updatedUser = {
      name: this.state.input,
      uid: authRequest.getUid(),
    };
    userRequests
      .putUser(firebaseId, updatedUser)
      .then(() => {
        this.props.history.push('/profile');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  getInitialState = () => {
    return { input: '' };
  }

  handleInputChange = (e) => {
    this.setState({ input: e.target.value });
  }

  removeChild = (id) => {
    const children = [ ...this.state.children ];
    const filteredChildren = children.filter((child) => {
      return child.id !== id;
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

    return (
      <div className="container">
        <div className="row">
          <h1>Profile</h1>
          <div className="user-details">
            <h3>User Details</h3>
            <div className="parent">
              <h3>Name:</h3>
              <div>{user.name}</div>
              <button onClick={this.toggleHidden.bind(this)} className="btn btn-default glyphicon glyphicon-edit"></button>
            </div>
            {!this.state.isHidden && <UpdateParentName />}
            {/* <div className={this.props.shouldHide ? 'hidden' : ''} >
              <input type="text" onChange={ this.handleInputChange } />
              <button onClick={this.updateUser}>Save</button>
            </div> */}
          </div>
          <div className="childrens">
            <h3>Child/ren Details</h3>
            <div className="child-container">
              <div className="row">
                <div>{childrenComponents}</div>
                {/* <button className="btn btn-default glyphicon glyphicon-trash" alt="delete" onClick={xClickFunction}></button> */}
              </div>
              <div>
                <button className="btn btn-default glyphicon glyphicon-plus" alt="add new"></button>
              </div>
              <div className="childUpdateField">
                <input type="text" onChange={ this.handleInputChange } />
                <button onClick={this.addChild}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const UpdateParentName = () => (
  <div className="parent-update-field" >
    <input type="text" onChange={ this.handleInputChange } />
    <button onClick={this.updateUser}>Save</button>
  </div>
);

export default Profile;
