import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import styled from 'styled-components';

import Rooms from '../../../collections/rooms';
import TextFragments from '../../../collections/textFragments';
import {
  MainColumn,
  TabColumn,
  RightColumn,
  MenuIcon,
  ImageDetailView,
  Loading
} from '../../components';
import { findGlossar } from '../../../helper/room';
import { getDefaultTabId } from '../../../helper/tab';
import { storeFragments } from '../../../helper/fragment';
import {
  setSelectedTabId,
  setSelectedRoomId,
  setSelectedTabColor
} from '../../../helper/actions';
import { exists, startStreamTimeout } from '../../../helper/global';
import {
  setSelectGraphNode,
  getSelectedRoomId,
  setLanguage
} from '../../../helper/actions';
import { RoomCooser, RoomChooser } from '../../admin/AdminHelpers';

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
    return <Loading />;
  }

  renderRoom() {
    var selectedTabId = this.props.selectedTabId;
    if (!exists(selectedTabId)) {
      selectedTabId = getDefaultTabId(this.props.room.subsections);
    }
    const roomGlossar = findGlossar(this.props.room);
    var selectedGraphNodeId = this.state.selectedGraphNodeId;
    if (!exists(selectedGraphNodeId)) {
      selectedGraphNodeId = this.props.room.key;
    }
    return (
      <RoomElem className="Room" powerOn={this.props.powerOn}>
        <MainColumn room={this.props.room} />
        <TabColumn
          selectedTabId={selectedTabId}
          tabs={this.props.room.subsections}
          roomId={this.props.room.key}
          roomColor={this.props.room.color}
        />
        <RightColumn
          graphNodeId={selectedGraphNodeId}
          room={this.props.room}
          roomGlossar={roomGlossar}
        />
        <MenuIcon />
        <ImageDetailView />
        <RoomChooserFixed className="RoomChooserFixed">
          <RoomChooser roomKey={this.props.room.key} disableNonExistingVariants />
        </RoomChooserFixed>
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
  const variant = Session.get("roomVariant");
  const sub = Meteor.subscribe('room', roomId, variant);
  const sub2 = Meteor.subscribe('fragments.list');

  let room = Rooms.findOne({ key: roomId, variant });

  if (!room && sub.ready()) {
    console.log("moving to live version")
    Session.set("roomVariant", 'live');
    room = Rooms.findOne({ key: roomId, variant: 'live' });
  }

  const queryString = require('query-string');
  const parsed = queryString.parse(props.location.search);
  var tabId = parsed.tabId;
  if (!tabId) {
    if (room && room.subsections) {
      tabId = room.subsections[0].identifier // set default tab
    }
  }
  if (exists(tabId)) {
    setSelectedTabId(tabId);
    if (room && room.subsections) {
      const tabColor = room.color;
      setSelectedTabColor(tabColor);
    }
  }
  setSelectedRoomId(roomId);
  var lang = parsed.language;
  if (exists(lang)) {
    setLanguage(lang);
  }

  return {
    room,
    selectedTabId: tabId,
    fragments: TextFragments.find().fetch(),
    ready: sub.ready() && sub2.ready() && room,
    powerOn: Session.get("powerOn")
  };
})(Room);

const RoomElem = styled.div`
  display: flex;
  flex-direction: row;
  & > *:not(nav):not(.RoomChooserFixed) {
    flex: 1;
    height: 100%;
    width: calc(100% / 3);
    overflow: hidden;
    transition: opacity 0.5s, background-color 0.5s, color 1s 0.5s;
  }
  height: 100%;
  overflow: hidden;
  ${props => props.powerOn ? '' : `
  background-color: black;
    & > *:not(nav) {
      background-color: black;
      opacity:0.5;
      transition: opacity 0.5s, background-color 0.5s;
    }
    * {
      color: transparent !important;
      border-color: transparent;
      background-image:none;
    }
    img {
      visibility:hidden;
    }
  `}

`;

const RoomChooserFixed = styled.div`
    position:fixed;
    bottom: 1.5em;
    left: 50vw;
    transform: translateX(-50%);
    z-index:999;
    opacity: 0.9;
    box-shadow: 1ex 1ex 1ex rgba(0,0,0,0.6);
`