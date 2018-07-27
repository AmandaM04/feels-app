import React from 'react';

import './RecordsForm.css';

const defaultRecord = {
  temperature: 0,
  medications: '',
  symptoms: '',
};

class RecordsForm extends React.Component {
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

  render () {
    const {newRecord} = this.state;
    return (
      <form className="col-xs-8 col-xs-offset-2">
        <div className="form-group">
          <label htmlFor="inputTemperature">
            Temperature:
          </label>
          <div className="col-sm-6">
            <input
              type="number"
              className="form-control"
              id="inputTemperature"
              placeholder="Temperature"
              value={newRecord.temperature}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputMedication">
            Medication:
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              id="inputMedication"
              placeholder="Medications"
              value={newRecord.medications}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputSymptoms">
            Symptoms:
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              id="inputSymptoms"
              placeholder="Symptoms"
              value={newRecord.symptoms}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default RecordsForm;
