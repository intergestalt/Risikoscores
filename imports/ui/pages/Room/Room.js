import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Rooms from '../../../collections/rooms';
import { MainColumn, TabColumn, RightColumn } from '../../components';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTabId: null,
      preSelectedTabId: null
    };
  }

  renderLoading() {
    return <div className="Room">Loading...</div>;
  }

  renderTabs() {
    return (
      <ul>
        Tabs
        {this.props.room.subsections.map(tab => {
          return (
            <li>
              {tab.title[this.props.language]}
              {tab.text[this.props.language]}
            </li>
          );
        })}
      </ul>
    );
  }

  renderRoom() {
    console.log(this.props.room);
    return (
      <div className="Room">
        <MainColumn room={this.props.room} />
        <TabColumn
          selectedTabId={this.state.selectedTabId}
          preSelectedTabId={this.state.preSelectedTabId}
          tabs={this.props.room.subsections}
          roomFolder={this.props.room.identifier}
        />
        <RightColumn room={this.props.room} />
      </div>
    );
  }
  /* <div className="roomColumn">
  {this.props.room.name[this.props.language]}
</div>
<div className="roomColumn">
  {this.props.room.subsections && this.renderTabs()}
</div>
<div className="roomColumn">Col 3</div>*/

  render() {
    if (!this.props.ready) {
      return this.renderLoading();
    }
    return this.renderRoom();
  }
}

export default withTracker(props => {
  const room_id = props.match.params._id;
  const sub = Meteor.subscribe('room', room_id);

  return {
    room: Rooms.findOne(room_id),
    ready: sub.ready()
  };
})(Room);
