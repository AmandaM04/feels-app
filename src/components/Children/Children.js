import React from 'react';

import './Children.css';

class ChildComp extends React.Component {
  addClickEvent = () => {
    this.props.removeChild(this.props.details.id);
  }
  render () {
    const {details} = this.props;
    return (
      <div className="children">
        <div className="row">
          <p className="childName col-xs-2">{details.name}</p>
          <button className="btn btn-default-sm glyphicon glyphicon-trash deleteChild col-xs-2" onClick={this.addClickEvent}></button>
        </div>
      </div>
    );
  }
}

export default ChildComp;
