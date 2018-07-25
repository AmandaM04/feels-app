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
        <h2 className="child-name">{details.name}</h2>
        <button className="btn btn-default glyphicon glyphicon-trash" alt="delete" onClick={this.addClickEvent}></button>
      </div>
    );
  }
}

export default ChildComp;
