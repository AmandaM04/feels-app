import React from 'react';
import moment from 'moment';

import './Records.css';

import RecordsForm from '../RecordsForm/RecordsForm';

import userRequests from '../../firebaseRequests/user';
import childrenRequests from '../../firebaseRequests/children';
import authRequest from '../../firebaseRequests/auth';
import recordsRequests from '../../firebaseRequests/records';

class Records extends React.Component {
  state = {
    user: [],
    records: [],
    children: [],
    childsLatestRecord: {},
    selectedChild: '',
    isHiddenForm: true,
  }

  /* shows or hides form to add new record for child or patient */
  toggleHiddenForm = () => {
    this.setState({
      isHiddenForm: !this.state.isHiddenForm,
    });
  }

  /* saves new record with date and time information
     post new record to firebase
     gets new record for child with matching UID as parent
     calls function for getting records for child selected */
  onSubmit = (record) => {
    record.dateTime = moment();
    recordsRequests
      .postRecord(record)
      .then(() => {
        recordsRequests
          .getRecords(authRequest.getUid())
          .then((records) => {
            this.setState({ records: records },
              () => {
                this.getRecordsForSelectedChild();
              });
          });
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  /* allows you to select the child you are wanting to add a new record for
     calls function for getting records for child selected */
  setSelectedChild = (e) => {
    const childName = e.target.innerHTML;
    this.setState({ selectedChild: childName }, () => {
      this.getRecordsForSelectedChild();
    });
  }

  /* sets state for selected child
     makes a copy of the records and set that state
     returns the newest record */
  getRecordsForSelectedChild = () => {
    const child = this.state.selectedChild;
    const recordCopy = [...this.state.records];
    let newestRecord = '';
    if (recordCopy.length === 0) {
      newestRecord = {};
    } else {
      const childRecords = recordCopy.filter((record) => {
        return record.name === child;
      });
      newestRecord = childRecords[childRecords.length - 1];
    }
    this.setState({ childsLatestRecord: newestRecord });
  };

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
        /* getting data for the records of the children of the parent user with matching UID
        sorting data from newest to oldest  */
        recordsRequests
          .getRecords(authRequest.getUid())
          .then((records) => {
            records.sort((a,b) => {
              return +new Date(a.dateTime) - +new Date(b.dateTime);
            });
            this.setState({ records: records });
          });
      })
      .catch(((error) => {
        console.error(error.message);
      }));
  }

  render () {
    /* setting the state of the user, childs latest record, and the children  */
    const { user, childsLatestRecord, children } = this.state;
    /* creating a function that is displaying the child's name as a button, passing in the index of the child in order to only return information associated with the selected child   */
    const childSelector = () => {
      return children.map((child, index) => {
        return (<button className="chldSelectorButton" key={index} onClick={this.setSelectedChild}>{child.name}</button>);
      });
    };

    /* displaying the form that allows the user to input a new record for their child or patient
      brings in information from the RecordsForm component */
    const NewRecordsForm = () => (
      <div className="newRecordInput" >
        <RecordsForm
          childName={this.state.selectedChild}
          onSubmit={this.onSubmit}
        />
      </div>
    );
    return (
      /* displays the users name, shows all of the children or patients names as buttons
         only shows the add new record button if the user has children on patients within their account
         only shows the temperature, medications, and symptoms if the user has children and also has information that they have typed in to show
         displays the temperatures, medications, and symptoms with a date and time stamp under the correct category */
      <div className="records">
        <div className="introParent">
          <h4><strong>Welcome {user.name}</strong></h4>
          {childSelector()}
          {this.state.selectedChild !== '' ? (
            <div>
              <div>
                <button onClick={this.toggleHiddenForm} className="newRecord">Add New Record</button>
              </div>
              <div className="recordForm">
                {!this.state.isHiddenForm ? NewRecordsForm() : ''}
              </div>
              <br></br>
            </div>
          ) : ''}
        </div>
        {(this.state.selectedChild !== '' && childsLatestRecord !== undefined) ?
          (<div>
            <div className="col-xs-8 col-xs-offset-2">
              <div className="introChild">
                <div>Records for: <strong>{childsLatestRecord.name}</strong></div>
              </div>
              <h3 className="text-center">Temperature</h3>
              <div className="tempHolder">
                <p>{childsLatestRecord.temperature}<span className="degree">&deg;F</span> @ {moment(childsLatestRecord.dateTime).format('LLL')}</p>
              </div>
              <h3 className="text-center">Medications</h3>
              <div className="medHolder">
                <p>{childsLatestRecord.medications} @ {moment(childsLatestRecord.dateTime).format('LLL')}</p>
              </div>
              <h3 className="text-center">Symptoms</h3>
              <div className="sympHolder">
                <p>{childsLatestRecord.symptoms} @ {moment(childsLatestRecord.dateTime).format('LLL')}</p>
              </div>
            </div>
          </div>) : ''
        }

      </div>
    );
  }
}

export default Records;
