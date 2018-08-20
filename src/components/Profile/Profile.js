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

  // shows and hides the edit input field for parent or caregivers name
  toggleHiddenParent = () => {
    this.setState({
      isHiddenParent: !this.state.isHiddenParent,
    });
  }

  // shows and hides the add new child name input field
  toggleHiddenChild = () => {
    this.setState({
      isHiddenChild: !this.state.isHiddenChild,
    });
  }

  /* gets the id of the current user,
  changes state of name depending on text typed and saved in the input field */
  updateUser = () => {
    const firebaseId = this.state.user.id;
    const updatedUser = {
      name: this.state.input,
      uid: authRequest.getUid(),
    };
    /* updates the name of the current user with matching id to firebase
    and redoes the getUser to now show the new users name */
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

  /* gets the state of the input field and returns it as a string */
  getInitialState = () => {
    return { input: '' };
  }

  /* holds the value of the input field before updating or saving and changes
  state from initial  */
  handleInputChange = (e) => {
    this.setState({ input: e.target.value });
  }

  /* removes the deleted child or patient from users profile based on the id of the child within firebase  */
  removeChild = (key) => {
    const children = [...this.state.children];
    firebase.database().ref('children').child(key).remove();
    const filteredChildren = children.filter((child) => {
      return child.id !== key;
    });
    this.setState({ children: filteredChildren });
  }

  /* adds a new child name based on text typed into the input field
  and assigns that child to the parent with the matching UID */
  addChild = () => {
    const newChild = {
      name: this.state.input,
      uid: authRequest.getUid(),
    };
    /* adds the new child to firebase */
    childrenRequests
      .postChild(newChild)
      .then(() => {
        /* does a new get request to display the updated list of children that match the Parent UID */
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

  /* getting data for the user with their associated UID
   and setting state with only that particular user who's UID matches  */
  componentDidMount () {
    userRequests
      .getUsers(authRequest.getUid())
      .then((user) => {
        this.setState({ user: user[0] });
        /* getting data for the children who have the same UID as the user above
   and setting state with only those children  */
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
    /* returns the state of the user */
    const { user } = this.state;
    /* returns the state of the child, maps through each child allowing information to be used
    from the Children Component that will need to be used in this component */
    const childrenComponents = this.state.children.map((child) => {
      return (
        <ChildComp
          key={child.id}
          details={child}
          removeChild={this.removeChild}
        />
      );
    });

    /* creates a div for an input field, holds the value inside the input field, and updates the user when you click the save button */
    const UpdateParentName = () => (
      <div className="parentUpdateField" >
        <input type="text" id="userInput" onChange={this.handleInputChange} />
        <button onClick={this.updateUser}>Save</button>
      </div>
    );

    /* creates a div for an input field, holds the value inside the input field, and adds a new child when you click the save button */
    const AddNewChildName = () => (
      <div className="newChildField" >
        <input type="text" id="childInput" onChange={this.handleInputChange} />
        <button onClick={this.addChild}>Save</button>
      </div>
    );
    /* displays the user or parent name with the option of editing
       shows/hides input fields for parent name and child name
       displays children component, allows deletion and adding a new child */
    return (
      <div className="container">
        <div className="row">
          <div className="userDetails">
            <h3>User Details</h3>
            <div className="parent">
              <h4>{user.name}</h4>
              <button onClick={this.toggleHiddenParent} type="button" className="btn btn-default btn-secondary">Edit</button>
            </div>
            {!this.state.isHiddenParent ? UpdateParentName() : ''}
          </div>
          <div className="separator"></div>
          <div className="childrens">
            <div className="childContainer">
              <h3>Patient Details</h3>
              <div className="row">{childrenComponents}</div>
              <div className="row">
                <button onClick={this.toggleHiddenChild} className="btn btn-default">Add New</button>
              </div>
              {!this.state.isHiddenChild ? AddNewChildName() : ''}
              <div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
