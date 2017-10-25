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
        <StartRoomMenu
          selectedId={this.props.selectedId}
          rooms={this.props.rooms}
          graph={this.props.graph}
        />
      </div>
    );
  }
}

StartRoomMenuArea.propTypes = {
  rooms: PropTypes.array,
  graph: PropTypes.array,
  selectedId: PropTypes.string
};

export default StartRoomMenuArea;
