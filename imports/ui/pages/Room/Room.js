import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import Rooms from '../../../collections/rooms';
import TextFragments from '../../../collections/textFragments';
import { MainColumn, TabColumn, RightColumn } from '../../components';
import { findGlossar } from '../../../helper/room';
import { getDefaultTabId } from '../../../helper/tab';
import { storeFragments } from '../../../helper/fragment';
import { exists } from '../../../helper/global';

class Room extends React.Component {
  constructor(props) {
    super(props);
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
    return (
      <div className="Room">
        <MainColumn room={this.props.room} />
        <TabColumn
          selectedTabId={selectedTabId}
          tabs={this.props.room.subsections}
          roomFolder={this.props.room._id}
          roomId={this.props.room._id}
        />
        <RightColumn room={this.props.room} roomGlossar={roomGlossar} />
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

  const queryString = require('query-string');
  const parsed = queryString.parse(props.location.search);
  var tabId = parsed.tabId;
  return {
    room: Rooms.findOne(room_id),
    selectedTabId: tabId,
    fragments: TextFragments.find().fetch(),
    ready: sub.ready() && sub2.ready
  };
})(Room);
