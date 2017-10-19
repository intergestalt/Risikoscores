import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { localeStr } from '../../helper/global';

class StartRoomMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  getRooms() {
    var result = [];
    for (var i = 0; i < this.props.rooms.length; i++) {
      const room = this.props.rooms[i];
      var text = localeStr(room.name);
      const neu = (
        <li key={'_' + i}>
          <NavLink to={'/rooms/' + room._id}>{text}</NavLink>
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
  rooms: PropTypes.array
};

export default StartRoomMenu;
