import React, { Component } from 'react';
import { Navigation, Glossar } from './';
import PropTypes from 'prop-types';

class RightColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="RightColumn">
        <Glossar room={this.props.room} />
        <Navigation room={this.props.room} />
      </div>
    );
  }
}

RightColumn.propTypes = {
  room: PropTypes.object
};

export default RightColumn;
