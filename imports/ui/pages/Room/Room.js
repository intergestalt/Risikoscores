import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import Rooms from '../../../collections/rooms';
import TextFragments from '../../../collections/textFragments';
import { MainColumn, TabColumn, RightColumn } from '../../components';
import { findGlossar } from '../../../helper/room';
import { getDefaultTabId } from '../../../helper/tab';
import { storeFragments } from '../../../helper/fragments';
import { exists } from '../../../helper/global';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.toggleExpandGlossar = this.toggleExpandGlossar.bind(this);
    this.showGlossarDetail = this.showGlossarDetail.bind(this);
    this.closeGlossarDetail = this.closeGlossarDetail.bind(this);

    this.state = {
      selectedTabId: null,
      preSelectedTabId: null,
      glossarExpanded: true,
      glossarDetailId: null
    };
  }
  toggleExpandGlossar(e) {
    console.log('Toggle');
    e.preventDefault();
    this.setState({ glossarExpanded: !this.state.glossarExpanded });
  }
  showGlossarDetail(e, id) {
    e.preventDefault();
    console.log('Open Detail ' + id);
    this.setState({ glossarDetailId: id });
  }
  closeGlossarDetail(e) {
    e.preventDefault();
    console.log('Close Detail ');
    this.setState({ glossarDetailId: null });
  }

  renderLoading() {
    return <div className="Room">Loading...</div>;
  }

  renderRoom() {
    var selectedTabId = this.props.selectedTabId;
    if (!exists(selectedTabId)) {
      console.log('DEFAULTTAB');
      selectedTabId = getDefaultTabId(this.props.room.subsections);
    }
    console.log('selectedTabId ' + selectedTabId);
    const roomGlossar = findGlossar(this.props.room);
    return (
      <div className="Room">
        <MainColumn
          room={this.props.room}
          glossarCallback={this.showGlossarDetail}
        />
        <TabColumn
          selectedTabId={selectedTabId}
          preSelectedTabId={this.state.preSelectedTabId}
          tabs={this.props.room.subsections}
          roomFolder={this.props.room._id}
          roomId={this.props.room._id}
          glossarCallback={this.showGlossarDetail}
        />
        <RightColumn
          room={this.props.room}
          glossarDetailId={this.state.glossarDetailId}
          glossarExpanded={this.state.glossarExpanded}
          toggleExpandGlossar={this.toggleExpandGlossar}
          closeGlossarDetail={this.closeGlossarDetail}
          glossarCallback={this.showGlossarDetail}
          roomGlossar={roomGlossar}
        />
      </div>
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
  const room_id = props.match.params._id;
  const sub = Meteor.subscribe('room', room_id);

  const sub2 = Meteor.subscribe('fragments.list');
  var fragments = Session.get('fragments');
  var readyFragment = true;
  if (!exists(fragments)) {
    fragments = TextFragments.find().fetch();
    readyFragment = sub2.ready();
  }
  console.log(props.location.search);
  const queryString = require('query-string');
  const parsed = queryString.parse(props.location.search);
  console.log(parsed);
  var tabId = parsed.tabId;
  return {
    room: Rooms.findOne(room_id),
    selectedTabId: tabId,
    fragments: fragments,
    ready: sub.ready() && readyFragment
  };
})(Room);
