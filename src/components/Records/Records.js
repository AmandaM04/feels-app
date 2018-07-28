import React from 'react';

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
    isHidden: true,
  }

  toggleHiddenForm = () => {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  onSubmit = (record) => {
    recordsRequests
      .postRecord(record)
      .then(() => {
        recordsRequests
          .getRecords(authRequest.getUid())
          .then((records) => {
            this.setState({ records: records });
          });
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  setSelectedChild = (e) => {
    const childName = e.target.innerHTML;
    this.setState({ selectedChild: childName}, () => {
      this.getRecordsForSelectedChild();
    });
  }

  getRecordsForSelectedChild = () => {
    const child = this.state.selectedChild;
    const recordCopy = [...this.state.records];
    const childRecords = recordCopy.filter((record) => {
      return record.name === child;
    });
    const newestRecord = childRecords[childRecords.length - 1];
    this.setState({childsLatestRecord: newestRecord});
  };

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
        recordsRequests
          .getRecords(authRequest.getUid())
          .then((records) => {
            this.setState({ records: records });
          });
      })
      .catch(((error) => {
        console.error(error.message);
      }));
  }

  render () {
    const { user, childsLatestRecord, children } = this.state;
    const childSelector = () => {
      return children.map((child, index) => {
        return (<button key={index} onClick={this.setSelectedChild}>{child.name}</button>);
      });
    };

    const NewRecordsForm = () => (
      <div className="newRecordInput" >
        <RecordsForm
          childName={childsLatestRecord.name}
          onSubmit={this.onSubmit}
        />
      </div>
    );
    return (
      <div className="records">
        <div className="introParent">
          <h4>Welcome {user.name}</h4>
          {childSelector()}
        </div>
        {(this.state.selectedChild !== '' && childsLatestRecord !== undefined) ?
          (<div>
            <div className="introChild">
              <h4>Records for: {childsLatestRecord.name}</h4>
            </div>
            <div>
              <button onClick={this.toggleHiddenForm}>Add New Record</button>
            </div>
            {!this.state.isHidden ? NewRecordsForm() : ''}
            <div className="col-xs-8 col-xs-offset-2">
              <h3>Temperature</h3>
              <div className="tempHolder">
                <p>{childsLatestRecord.temperature}</p>
              </div>
              <h3>Medications</h3>
              <div className="medHolder">
                <p>{childsLatestRecord.medications}</p>
              </div>
              <h3>Symptoms</h3>
              <div className="sympHolder">
                <p>{childsLatestRecord.symptoms}</p>
              </div>
            </div>
          </div>) : ''
        }

      </div>
    );
  }
}

export default Records;
