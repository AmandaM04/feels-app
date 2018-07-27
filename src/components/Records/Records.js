import React from 'react';

import './Records.css';

// import user from '../User/User';
import RecordsForm from '../RecordsForm/RecordsForm';

import userRequests from '../../firebaseRequests/user';
import authRequest from '../../firebaseRequests/auth';
import recordsRequests from '../../firebaseRequests/records';

class Records extends React.Component {
  state = {
    user: [],
    records: [
      // name: '',
      // temperature: '',
      // medications: '',
      // symptoms: '',
      // uid: '',
    ],
  }

  componentDidMount () {
    userRequests
      .getUsers(authRequest.getUid())
      .then((user) => {
        this.setState({ user: user[0] });
        recordsRequests
          .getRecords(authRequest.getUid())
          .then((records) => {
            this.setState({ records: records[0] });
          });
      })
      .catch(((error) => {
        console.error(error.message);
      }));
  }

  render () {
    const { user, records } = this.state;
    return (
      <div className="records">
        <h1>Records</h1>
        <div className="intro-parent">
          <p>Welcome {user.name}</p>
        </div>
        <div>
          <button>Add New Record</button>
          <RecordsForm />
        </div>
        <h3>Temperature</h3>
        <div className="tempHolder">
          {/* {records.map = (d,idx) => {
            return (<p key={idx}>{d.temperature}</p>);
          }} */}
          <p>{records.temperature}</p>
        </div>
        <h3>Medications</h3>
        <div className="medHolder">
          <p>{records.medications}</p>
        </div>
        <h3>Symptoms</h3>
        <div className="sympHolder">
          <p>{records.symptoms}</p>
        </div>
      </div>
    );
  }
}

export default Records;
