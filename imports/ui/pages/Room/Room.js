import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';

import Rooms from '../../../collections/rooms';
import TextFragments from '../../../collections/textFragments';
import {
  MainColumn,
  TabColumn,
  RightColumn,
  MenuIcon,
  ImageDetailView
} from '../../components';
import { findGlossar } from '../../../helper/room';
import { getDefaultTabId } from '../../../helper/tab';
import { storeFragments } from '../../../helper/fragment';
import { setSelectedTabId, setSelectedRoomId } from '../../../helper/actions';
import { exists, startStreamTimeout } from '../../../helper/global';
import {
  setSelectGraphNode,
  getSelectedRoomId,
  setLanguage
} from '../../../helper/actions';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedGraphNodeId: null };
  }

  componentDidMount() {
    document.documentElement.classList.toggle('noscroll', true);
    setSelectGraphNode(getSelectedRoomId());
    startStreamTimeout();
  }

  componentWillUnmount() {
    document.documentElement.classList.toggle('noscroll', false);
  }

  renderLoading() {
    return <div className="Room">Loading...</div>;
  }

  renderRoom() {
    var selectedTabId = this.props.selectedTabId;
    if (!exists(selectedTabId)) {
      selectedTabId = getDefaultTabId(this.props.room.subsections);
    }
    const roomGlossar = findGlossar(this.props.room);
    var selectedGraphNodeId = this.state.selectedGraphNodeId;
    if (!exists(selectedGraphNodeId)) {
      selectedGraphNodeId = this.props.room._id;
    }
    return (
      <RoomElem className="Room">
        <MainColumn room={this.props.room} />
        <TabColumn
          selectedTabId={selectedTabId}
          tabs={this.props.room.subsections}
          roomId={this.props.room._id}
        />
        <RightColumn
          graphNodeId={selectedGraphNodeId}
          room={this.props.room}
          roomGlossar={roomGlossar}
        />
        <MenuIcon />
        <ImageDetailView />
      </RoomElem>
    );
  }

  render() {
    if (!this.props.ready) {
      return this.renderLoading();
    }
    storeFragments(this.props.fragments);
    return this.renderRoom();
  }
}

export default withTracker(props => {
  const roomId = props.match.params._id;
  const sub = Meteor.subscribe('room', roomId);
  const sub2 = Meteor.subscribe('fragments.list');

  const queryString = require('query-string');
  const parsed = queryString.parse(props.location.search);
  var tabId = parsed.tabId;
  if (exists(tabId)) {
    setSelectedTabId(tabId);
  }
  setSelectedRoomId(roomId);
  var lang = parsed.language;
  if (exists(lang)) {
    setLanguage(lang);
  }

  return {
    room: Rooms.findOne(roomId),
    selectedTabId: tabId,
    fragments: TextFragments.find().fetch(),
    ready: sub.ready() && sub2.ready
  };
})(Room);

const RoomElem = styled.div`
  display: flex;
  flex-direction: row;
  & > *:not(nav) {
    flex: 1;
    height: 100%;
    width: calc(100% / 3);
    overflow: hidden;
  }
  height: 100%;
  overflow: hidden;
`;
