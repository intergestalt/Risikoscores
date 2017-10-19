import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StartRoomMenu } from './';

class StartRoomMenuArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="StartRoomMenuArea">
        <StartRoomMenu rooms={this.props.rooms} />
      </div>
    );
  }
}

StartRoomMenuArea.propTypes = {
  rooms: PropTypes.array
};

export default StartRoomMenuArea;
