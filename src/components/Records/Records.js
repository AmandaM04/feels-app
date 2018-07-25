import React from 'react';

import './Records.css';

// import user from '../User/User';

import userRequests from '../../firebaseRequests/user';
import authRequest from '../../firebaseRequests/auth';
import recordsRequests from '../../firebaseRequests/records';

class Records extends React.Component {
  state = {
    user: [],
    records: {
      uid: '',
      temperature: '',
      medications: '',
      symptoms: '',
    },
  }

  componentDidMount () {
    userRequests
      .getUsers(authRequest.getUid())
      .then((user) => {
        this.setState({ user: user[0] });
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
    const { user, records } = this.state;
    return (
      <div className="records">
        <h1>Records</h1>
        <div className="intro-parent">
          <p>Welcome {user.name}</p>
        </div>
        <h3>Temperature</h3>
        <div className="tempHolder">
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
