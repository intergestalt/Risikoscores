import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import Rooms from '../../../collections/rooms';
import { RoomChooser } from '../AdminHelpers';

import ListItem from './ListItem';

class AdminRooms extends React.Component {
  renderRooms(rooms) {
    return (
      <ul>
        {rooms.map(room => {
          return (
            <li key={room._id}>
              <ListItem room={room} collection={Rooms} />
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    return (
      <div className="AdminRooms">
        <h2>
          Rooms &nbsp; <RoomChooser />
        </h2>
        {this.renderRooms(this.props.rooms)}
      </div>
    );
  }
}

// export default AdminRooms;

export default withTracker(props => {
  const variant = Session.get('roomVariant');
  Meteor.subscribe('rooms.list', variant);

  return {
    rooms: Rooms.find({}, { sort: { 'name.de': 1 } }).fetch()
  };
})(AdminRooms);
