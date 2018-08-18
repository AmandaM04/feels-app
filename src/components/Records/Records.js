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

  toggleHiddenForm = () => {
    this.setState({
      isHiddenForm: !this.state.isHiddenForm,
    });
  }

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

  setSelectedChild = (e) => {
    const childName = e.target.innerHTML;
    this.setState({ selectedChild: childName }, () => {
      this.getRecordsForSelectedChild();
    });
  }

  getRecordsForSelectedChild = () => {
    const child = this.state.selectedChild;
    const recordCopy = [...this.state.records];
    // console.log('recordCopy:', recordCopy);
    let newestRecord = '';
    if (recordCopy.length === 0) {
      newestRecord = {};
    } else {
      const childRecords = recordCopy.filter((record) => {
        return record.name === child;
      });
      newestRecord = childRecords[childRecords.length - 1];
    }
    // console.log('newestRecord:', newestRecord);
    this.setState({ childsLatestRecord: newestRecord });
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
    const { user, childsLatestRecord, children } = this.state;
    const childSelector = () => {
      return children.map((child, index) => {
        return (<button className="chldSelectorButton" key={index} onClick={this.setSelectedChild}>{child.name}</button>);
      });
    };

    const NewRecordsForm = () => (
      <div className="newRecordInput" >
        <RecordsForm
          childName={this.state.selectedChild}
          onSubmit={this.onSubmit}
        />
      </div>
    );
    return (
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
