import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import {
  setSelectGraphNode,
  getSelectedRoomId,
  setPreSelectedTabId,
  getLanguage,
  setGraphNodeSelected
} from '../../../helper/actions';

import { exists } from '../../../helper/global';

class Link extends React.Component {
  constructor(props) {
    super(props);
    this.enterCallback = this.enterCallback.bind(this);
    this.leaveCallback = this.leaveCallback.bind(this);
    this.clickCallback = this.clickCallback.bind(this);
  }

  componentWillMount() {
    const selectedRoomId = getSelectedRoomId();
    const lang = getLanguage();
    this.sameRoom = selectedRoomId == this.props.room;
    this.path = '/rooms/' + this.props.room + '?language=' + lang;
    if (exists(this.props.tab)) {
      this.path += '&tabId=' + this.props.tab;
    }
  }

  clickCallback(e, roomId, tabId) {
    e.preventDefault();
    setGraphNodeSelected(0);
    this.props.history.push(this.path);
  }

  enterCallback(e, roomId, tabId) {
    const selectedRoomId = getSelectedRoomId();
    if (selectedRoomId === roomId) {
      if (exists(tabId)) {
        setPreSelectedTabId(tabId);
      }
    }
    setSelectGraphNode(roomId);
    setGraphNodeSelected(2);
  }
  leaveCallback(e) {
    setSelectGraphNode(getSelectedRoomId());
    setGraphNodeSelected(0);
    setPreSelectedTabId(null);
  }

  render() {
    return (
      <a
        style={this.sameRoom ? { color: this.props.color } : {}}
        href={this.sameRoom ? '#' : this.path}
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

export default withTracker(props => {
  return {
    color: Session.get('selectedTabColor')
  };
})(withRouter(Link));
