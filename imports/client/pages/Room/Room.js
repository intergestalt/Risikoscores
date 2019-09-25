import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import styled from 'styled-components';
import { colors } from '../../../config/styles';
import { keyframes } from 'styled-components';

import Rooms from '../../../collections/rooms';
import Questions from '../../../collections/questions';
import TextFragments from '../../../collections/textFragments';
import {
  MainColumn,
  TabColumn,
  RightColumn,
  MenuIcon,
  ImageDetailView,
  Loading,
  Popup,
  Game
} from '../../components';
import { findGlossar, storeRooms } from '../../../helper/room';
import { getDefaultTabId } from '../../../helper/tab';
import { storeFragments } from '../../../helper/fragment';
import { storeQuestions } from '../../../helper/question';
import {
  setSelectedTabId,
  setSelectedRoomId,
  setSelectedTabColor,
  setSelectedTabLinkColor,
  setSelectGraphNode,
  getSelectedRoomId,
  setLanguage,
  getCachedRooms,
  getPlayAudio,
  setPlayAudioAll,
  getPlayAudioFile,
  setPlayAudio,
  getPlayAudioFirst,
  setPlayAudioFirst,
  getBeamOut
} from '../../../helper/actions';
import { exists } from '../../../helper/global';
import { startPopupsTimeout } from '../../../helper/popup';
import { startStreamTimeout } from '../../../helper/stream';
import {} from '../../../helper/actions';
import { RoomCooser, RoomChooser } from '../../admin/AdminHelpers';
import { tabColors, tabColorPalette, tabLinkColorPalette } from '../../../config/tabColors';
import { getUrlPrefix } from '../../../helper/uploads';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedGraphNodeId: null };
    this.audioEnded = this.audioEnded.bind(this);
    this.audioElem = null;
  }

  componentDidMount() {
    document.documentElement.classList.toggle('noscroll', true);
    setSelectGraphNode(getSelectedRoomId());
    startStreamTimeout();
    startPopupsTimeout();
  }

  componentWillUnmount() {
    document.documentElement.classList.toggle('noscroll', false);
  }

  UNSAFE_componentWillMount() {
    Session.set('roomVisitCounter', Session.get('roomVisitCounter') + 1);
    Session.set('imageLayout', 'third');
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.room &&
      this.props.room &&
      nextProps.room._id != this.props.room._id
    ) {
      const counter = Session.get('roomVisitCounter');
      Session.set('roomVisitCounter', counter + 1);
    }
    if (Session.get('startWelcomeState') == 3) {
      Session.set('startWelcomeState', 2); // close open welcome message
    }
  }

  audioEnded() {
    setPlayAudio(false);
    setPlayAudioFirst(false);
    setPlayAudioAll(false);
  }
  getSound() {
    var sound = null;
    if (this.props.playAudio) {
      const file = getUrlPrefix() + '/live/sounds/' + getPlayAudioFile();
      sound = (
        <Audio
          src={file}
          onEnded={this.audioEnded}
          autoPlay
          innerRef={audio => {
            this.audio = audio;
          }}
        />
      );
    }
    return sound;
  }
  renderLoading() {
    return (
      <span>
        <Loading />
        <MenuIcon />
      </span>
    );
  }

  renderRoom() {
    var subsections = null;
    var roomId = null;
    var room = null;
    var roomGlossar = null;
    if (exists(this.props.room)) {
      subsections = this.props.room.subsections;
      room = this.props.room;
      roomId = this.props.room.key;
      roomGlossar = findGlossar(this.props.room);
    }
    var selectedTabId = this.props.selectedTabId;
    if (!exists(selectedTabId)) {
      selectedTabId = getDefaultTabId(subsections);
    }
    var selectedGraphNodeId = this.state.selectedGraphNodeId;
    if (!exists(selectedGraphNodeId)) {
      selectedGraphNodeId = roomId;
    }
    //console.log('0: ' + roomId + ' ' + room.key);

    return (
      <span>
        <RoomElem
          animationIn={!this.props.beamOut}
          animation={true}
          key="_room"
          className="Room"
          powerOn={this.props.powerOn}
        >
          <MainColumn room={room} authenticated={this.props.authenticated} />
          <TabColumn
            selectedTabId={selectedTabId}
            tabs={subsections}
            roomId={roomId}
            roomColor={this.props.roomColor}
          />
          <RightColumn
            graphNodeId={selectedGraphNodeId}
            room={room}
            roomGlossar={roomGlossar}
          />
        </RoomElem>
        <MenuIcon />
        <ImageDetailView />
        {this.props.authenticated && (
          <RoomChooserFixed className="RoomChooserFixed">
            <RoomChooser roomKey={roomId} disableNonExistingVariants />
          </RoomChooserFixed>
        )}
        <Game />
        {this.props.powerOn && (
          <Popup selectedTabId={selectedTabId} tabs={subsections} />
        )}
      </span>
    );
  }

  render() {
    let page = null;
    /* if (!this.props.ready) {
      page = this.renderLoading();
    } else {*/
    page = this.renderRoom();
    //}
    storeFragments(this.props.fragments);
    storeQuestions(this.props.questions);
    storeRooms(this.props.rooms);

    var result = (
      <span>
        {this.getSound()}
        {page}
      </span>
    );
    return result;
  }
}

export default withTracker(props => {
  const roomId = props.match.params._id;
  const variant = Session.get('roomVariant');
  const sub2 = Meteor.subscribe('fragments.list');
  const sub3 = Meteor.subscribe('questions.list');
  const sub4 = Meteor.subscribe('rooms.list');

  var rooms = null;
  const sort = {};
  const language = Session.get('language');
  sort['name.' + language] = 1;
  if (!exists(getCachedRooms())) {
    rooms = Rooms.find({}, { sort }).fetch();
  }

  const sub = Meteor.subscribe('room', roomId, variant);
  let room = Rooms.findOne({ key: roomId, variant });

  if (!room && sub.ready()) {
    console.log('moving to live version');
    Session.set('roomVariant', 'live');
    room = Rooms.findOne({ key: roomId, variant: 'live' });
  }

  const queryString = require('query-string');
  const parsed = queryString.parse(props.location.search);
  var tabId = parsed.tabId;
  var roomColor = 'grey';
  var roomLinkColor = 'grey';
  if (!tabId) {
    if (room && room.subsections) {
      tabId = room.subsections[0].identifier; // set default tab
    }
  }
  if (exists(tabId)) {
    setSelectedTabId(tabId);
    if (room && room.subsections) {
      roomColor =
        tabColorPalette[
          Session.get('roomVisitCounter') % tabColorPalette.length
        ];
      roomLinkColor =
        tabLinkColorPalette[
          Session.get('roomVisitCounter') % tabColorPalette.length
        ];        
      const tabColorsArray = tabColors(roomColor, room.subsections.length);
      let i = 0;
      for (let s of room.subsections) {
        s.color = tabColorsArray[i];
        i++;
      }
      setSelectedTabColor(roomColor);
      setSelectedTabLinkColor(roomLinkColor);
    }
  }
  setSelectedRoomId(roomId);
  var lang = parsed.language;
  if (exists(lang)) {
    setLanguage(lang);
  }
  return {
    room,
    rooms,
    selectedTabId: tabId,
    roomColor,
    fragments: TextFragments.find().fetch(),
    questions: Questions.find().fetch(),
    ready: sub.ready() && sub2.ready(),
    authenticated: Meteor.userId() !== null,
    powerOn: Session.get('powerOn'),
    playAudio: getPlayAudio() || getPlayAudioFirst(),
    beamOut: getBeamOut()
  };
})(Room);
const moveOut = keyframes`
                    0% {
                      opacity: 1;
                    }
                    100% {
                      opacity: 0;
                    }
                    `;
const moveIn = keyframes`
                    0% {
                      opacity: 0;
                    }
                    100% {
                      opacity: 1;
                    }
                    `;
const RoomElem = styled.div`
  ${props =>
    props.animation
      ? props.animationIn
        ? `animation: ${moveIn} 1000ms ease-in-out;`
        : `animation: ${moveOut} 1000ms ease-in-out;`
      : ''};
  display: flex;
  flex-direction: row;
  & > *:not(nav):not(.RoomChooserFixed):not(.Popup) {
    flex: 1;
    height: 100%;
    width: calc(100% / 3);
    overflow: hidden;
    transition: opacity 0.5s, background-color 0.5s, color 1s 0.5s;
  }
  height: 100%;
  overflow: hidden;
  ${props =>
    props.powerOn
      ? ''
      : `
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
  `};
`;

const RoomChooserFixed = styled.div`
  position: fixed;
  bottom: 1.5em;
  left: 50vw;
  transform: translateX(-50%);
  z-index: 999;
  opacity: 0.9;
  box-shadow: 1ex 1ex 1ex rgba(0, 0, 0, 0.6);
`;
const Audio = styled.audio`
  display: none;
`;
