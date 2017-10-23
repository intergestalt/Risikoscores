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
          neighbourIds={this.props.neighbourIds}
          rooms={this.props.rooms}
        />
      </div>
    );
  }
}

StartRoomMenuArea.propTypes = {
  rooms: PropTypes.array,
  selectedId: PropTypes.string,
  neighbourIds: PropTypes.array
};

export default StartRoomMenuArea;
