import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { localeStr } from '../../helper/global';
import {
  getGraphColors,
  getTheRealGraph,
  getNeighbours,
  getColor
} from '../../helper/graph';

class StartRoomMenu extends React.Component {
  constructor(props) {
    super(props);
    this.enterCallback = this.enterCallback.bind(this);
    this.leaveCallback = this.leaveCallback.bind(this);
  }
  selectRoom(roomId) {
    const realGraph = getTheRealGraph(this.props.graph);
    const neighbours = getNeighbours(roomId, realGraph);
    return neighbours;
  }

  enterCallback(e, roomId) {
    console.log('ENTER ' + roomId);
    if (this.props.graphCallback) {
      this.props.graphCallback(roomId);
    }
  }
  leaveCallback(e) {
    console.log('LEAVE');
    if (this.props.graphCallback) {
      this.props.graphCallback();
    }
  }

  getRooms() {
    var result = [];
    const neighbourHash = {};

    if (this.props.selectedId) {
      const neighbourIds = this.selectRoom(this.props.selectedId);
      for (var i = 0; i < neighbourIds.length; i++) {
        neighbourHash[neighbourIds[i]] = true;
      }
    }

    for (var i = 0; i < this.props.rooms.length; i++) {
      const room = this.props.rooms[i];
      const roomId = room._id;
      var text = localeStr(room.name);
      var selected = false;
      var neighbour = false;
      if (neighbourHash[roomId]) {
        neighbour = true;
      }
      if (roomId === this.props.selectedId) {
        selected = true;
      }

      var color = getColor('defaultLinkColor');
      if (selected) {
        color = getColor('selectedColor');
      }
      if (neighbour) {
        color = getColor('neighbourColor');
      }

      const neu = (
        <li key={'_' + i}>
          <NavLink
            style={{ color: color }}
            onMouseEnter={e => {
              this.enterCallback(e, roomId);
            }}
            onMouseLeave={e => {
              this.leaveCallback(e);
            }}
            to={'/rooms/' + roomId}
          >
            {text}
          </NavLink>
        </li>
      );
      result.push(neu);
    }
    return <ul>{result}</ul>;
  }

  render() {
    const rooms = this.getRooms();
    return <div className="StartRoomMenu">{rooms}</div>;
  }
}

StartRoomMenu.propTypes = {
  rooms: PropTypes.array,
  graph: PropTypes.array,
  graphCallback: PropTypes.func,
  selectedId: PropTypes.string
};

export default StartRoomMenu;
