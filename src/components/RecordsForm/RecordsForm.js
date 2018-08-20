import React from 'react';

import './RecordsForm.css';

import authRequest from '../../firebaseRequests/auth';

const defaultRecord = {
  temperature: '',
  medications: '',
  symptoms: '',
};

class RecordsForm extends React.Component {
  state = {
    newRecord: defaultRecord,
  }

  /* function to turn the value of the form field into a string */
  formFieldStringState = (name, e) => {
    const tempRecord = { ...this.state.newRecord };
    tempRecord[name] = e.target.value;
    this.setState({ newRecord: tempRecord });
  }

  /* function to turn the value of the form field into a number */
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

  /* prevent the default on form action
  before onSubmit can be done, all fields must be completed according to the properties of the newRecord
  alerts user to complete all fields before they can proceed */
  formSubmit = (e) => {
    e.preventDefault();
    const {onSubmit} = this.props;
    const {newRecord} = this.state;
    newRecord.uid = authRequest.getUid();
    newRecord.name = this.props.childName;
    if (
      newRecord.temperature &&
      newRecord.medications &&
      newRecord.symptoms
    ) {
      onSubmit(newRecord);
    } else {
      alert('Complete all fields');
    }
  }

  /* sets state of the newRecord
  creates a form with information being displayed under 3 headings.. Temperature, Medications, and Symptoms
  changes the input value inside form field to a string or number
  Submits or Save new record data */
  render () {
    const { newRecord } = this.state;
    return (
      <div className="col-xs-8 col-xs-offset-2">
        <h3 className="text-center">Submit new record:</h3>
        <form>
          <div className="form-group">
            <fieldset className="col-xs-12">
              <label htmlFor="inputTemperature">
                Temperature:
              </label>
              <div className="col-xs-12">
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
              <div className="col-xs-12">
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
              <div className="col-xs-12">
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
          <button onClick={this.formSubmit}>Save</button>
        </form>
      </div>
    );
  }
}

export default RecordsForm;
