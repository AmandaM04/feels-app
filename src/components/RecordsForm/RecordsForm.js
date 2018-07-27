import React from 'react';
// import PropTypes from 'prop-types';

import './RecordsForm.css';

import authRequest from '../../firebaseRequests/auth';
import recordsRequests from '../../firebaseRequests/records';

const defaultRecord = {
  temperature: '',
  medications: '',
  symptoms: '',
};

class RecordsForm extends React.Component {
  // static propTypes = {
  //   onSubmit: PropTypes.func.isRequired,
  // }

  state = {
    newRecord: defaultRecord,
  }

  formFieldStringState = (name, e) => {
    const tempRecord = { ...this.state.newRecord };
    tempRecord[name] = e.target.value;
    this.setState({ newRecord: tempRecord });
  }

  formFieldNumberState = (name, e) => {
    const tempRecord = { ...this.state.newRecord };
    tempRecord[name] = e.target.value * 1;
    this.setState({ newRecord: tempRecord });
  }

  temperatureChange = (e) => {
    this.formFieldNumberState('temperature', e);
  }

  medicationsChange = (e) => {
    this.formFieldStringState('medications', e);
  }

  symptomsChange = (e) => {
    this.formFieldStringState('symptoms', e);
  }

  formSubmit = (e) => {
    const {onSubmit} = this.props;
    const {newRecord} = this.state;
    e.preventDefault();
    if (
      newRecord.temperature &&
      newRecord.medications &&
      newRecord.symptoms
    ) {
      onSubmit(this.state.newRecord);
      this.setState({ newRecord: defaultRecord });
    } else {
      alert('Complete all fields');
    }
  }

  onSubmit = () => {
    const { newRecord } = this.state;
    recordsRequests
      .postRecord(newRecord)
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

  render () {
    const { newRecord } = this.state;
    return (
      <div className="col-xs-8 col-xs-offset-2">
        <h3 className="text-center">Submit new record:</h3>
        <form onSubmit={this.formSubmitEvent}>
          <div className="form-group">
            <fieldset className="col-xs-12">
              <label htmlFor="inputTemperature">
                Temperature:
              </label>
              <div className="col-sm-12">
                <input
                  type="number"
                  className="form-control"
                  id="inputTemperature"
                  placeholder="Temperature"
                  value={newRecord.temperature}
                  onChange={this.temperatureChange}
                />
              </div>
            </fieldset>
          </div>
          <div className="form-group">
            <fieldset className="col-xs-12">
              <label htmlFor="inputMedication">
                Medications:
              </label>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  id="inputMedication"
                  placeholder="Medications"
                  value={newRecord.medications}
                  onChange={this.medicationsChange}
                />
              </div>
            </fieldset>
          </div>
          <div className="form-group">
            <fieldset className="col-xs-12">
              <label htmlFor="inputSymptoms">
                Symptoms:
              </label>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  id="inputSymptoms"
                  placeholder="Symptoms"
                  value={newRecord.symptoms}
                  onChange={this.symptomsChange}
                />
              </div>
            </fieldset>
          </div>
          <button>Save</button>
        </form>
      </div>
    );
  }
}

export default RecordsForm;
