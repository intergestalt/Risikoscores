import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { localeStr } from '../../helper/global';

class StartRoomMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  /*enterCallback(e, nodeId) {
    const realGraph = getTheRealGraph(this.props.graph);
    const neighbours = getNeighbours(nodeId, realGraph);
    const outgoingEdges = getOutgoingEdges(nodeId, realGraph);
    colorMap = getGraphColors(realGraph, nodeId, neighbours, outgoingEdges);
    this.setState({
      nodeColors: colorMap.nodeColors,
      edgeColors: colorMap.edgeColors
    });
    if (this.props.graphCallback) {
      this.props.graphCallback(nodeId, neighbours);
    }
  }
  leaveCallback(e) {
    const realGraph = getTheRealGraph(this.props.graph);
    colorMap = getGraphColors(realGraph);
    this.setState({
      nodeColors: colorMap.nodeColors,
      edgeColors: colorMap.edgeColors
    });
    if (this.props.graphCallback) {
      this.props.graphCallback();
    }
  }*/

  getRooms() {
    var result = [];
    const neighbourHash = {};
    for (var i = 0; i < this.props.neighbourIds.length; i++) {
      neighbourHash[this.props.neighbourIds[i]] = true;
    }
    for (var i = 0; i < this.props.rooms.length; i++) {
      const room = this.props.rooms[i];
      const roomId = room._id;
      var text = localeStr(room.name);
      if (neighbourHash[roomId]) {
        text += ' (NEIGHBOUR)';
      }
      if (roomId === this.props.selectedId) {
        text += ' (SELECTED)';
      }

      const neu = (
        <li key={'_' + i}>
          <NavLink to={'/rooms/' + roomId}>{text}</NavLink>
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
  selectedId: PropTypes.string,
  neighbourIds: PropTypes.array
};

export default StartRoomMenu;
