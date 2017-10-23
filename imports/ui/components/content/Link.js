import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {
  setSelectGraphNode,
  getSelectedRoomId,
  setPreSelectedTabId
} from '../../../helper/actions';
import { exists } from '../../../helper/global';

class Link extends React.Component {
  constructor(props) {
    super(props);
    this.enterCallback = this.enterCallback.bind(this);
    this.leaveCallback = this.leaveCallback.bind(this);
  }

  enterCallback(e, roomId, tabId) {
    const selectedRoomId = getSelectedRoomId();
    if (selectedRoomId === roomId) {
      if (exists(tabId)) {
        setPreSelectedTabId(tabId);
      }
    }
    setSelectGraphNode(roomId);
  }
  leaveCallback(e) {
    setSelectGraphNode(getSelectedRoomId());
    setPreSelectedTabId(null);
  }

  render() {
    return (
      <NavLink
        to={'/rooms/' + this.props.room + '?tabId=' + this.props.tab}
        onMouseEnter={e => {
          this.enterCallback(e, this.props.room, this.props.tab);
        }}
        onMouseLeave={e => {
          this.leaveCallback(e);
        }}
      >
        {this.props.text}
      </NavLink>
    );
  }
}
Link.propTypes = {
  text: PropTypes.string,
  room: PropTypes.string,
  tab: PropTypes.string
};

export default Link;
