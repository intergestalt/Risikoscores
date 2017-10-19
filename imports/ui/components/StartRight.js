import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StartRoomMenuArea, StartGeneralMenuArea, StartGraphArea } from './';

class StartRight extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="StartRight">
        <StartRoomMenuArea rooms={this.props.rooms} />
        <StartGeneralMenuArea />
        <StartGraphArea />
      </div>
    );
  }
}

StartRight.propTypes = {
  rooms: PropTypes.array
};

export default StartRight;
