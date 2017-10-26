import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import {
  setSelectGraphNode,
  getSelectedRoomId,
  setPreSelectedTabId,
  getLanguage
} from '../../../helper/actions';
import { exists } from '../../../helper/global';

class Link extends React.Component {
  constructor(props) {
    super(props);
    this.enterCallback = this.enterCallback.bind(this);
    this.leaveCallback = this.leaveCallback.bind(this);
    this.clickCallback = this.clickCallback.bind(this);
  }

  clickCallback(e, roomId, tabId) {
    e.preventDefault();
    const lang = getLanguage();
    var path = '/rooms/' + this.props.room + '?language=' + lang;
    if (exists(this.props.tab)) {
      path = path + '&tabId=' + this.props.tab;
    }
    this.props.history.push(path);
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
      <a
        href="#"
        onClick={e => {
          this.clickCallback(e, this.props.room, this.props.tab);
        }}
        onMouseEnter={e => {
          this.enterCallback(e, this.props.room, this.props.tab);
        }}
        onMouseLeave={e => {
          this.leaveCallback(e);
        }}
      >
        {this.props.text}
      </a>
    );
  }
}
Link.propTypes = {
  text: PropTypes.string,
  room: PropTypes.string,
  tab: PropTypes.string
};

export default withRouter(Link);
