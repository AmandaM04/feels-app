import React from 'react';

import './Records.css';

// import user from '../User/User';
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
    console.log('childName:', childName);
    this.setState({ selectedChild: childName}, () => {
      this.getRecordsForSelectedChild();
    });
  }

  getRecordsForSelectedChild = () => {
    const child = this.state.selectedChild;
    console.log('child:', child);
    const recordCopy = [...this.state.records];
    console.log('recordCopy:', recordCopy);
    const childRecords = recordCopy.filter((record) => {
      console.log('record:', record);
      console.log('selectedChild:', child);
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
              <button>Add New Record</button>
            </div>
            <div>
              <RecordsForm
                childName={childsLatestRecord.name}
                onSubmit={this.onSubmit}
              />
            </div>
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
