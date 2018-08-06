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
        <p className="childName col-sm-9">{details.name}</p>
        <button className="btn btn-default-sm glyphicon glyphicon-trash deleteChild col-sm-3" onClick={this.addClickEvent}></button>
      </div>
    );
  }
}

export default ChildComp;
