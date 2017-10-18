import React, { Component } from 'react';
import { Navigation, GlossarArea } from './';
import PropTypes from 'prop-types';

class RightColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="RightColumn">
        <GlossarArea
          room={this.props.room}
          roomGlossar={this.props.roomGlossar}
        />
        <Navigation room={this.props.room} />
      </div>
    );
  }
}

RightColumn.propTypes = {
  room: PropTypes.object,
  roomGlossar: PropTypes.object
};

export default RightColumn;
