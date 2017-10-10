import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Rooms from '../../../collections/rooms';

import ListItem from './ListItem';

class AdminRooms extends React.Component {

  renderRooms(rooms) {
    return (
      <ul>{
      rooms.map((room)=>{
      return (<li>
        <ListItem room={room} />
        </li>)
    })}</ul>
    )
  }

  render() {
    return (
      <div className="AdminRooms">
        <h2>Rooms</h2>
        {this.renderRooms(this.props.rooms)}
      </div>
    );
  }
}

// export default AdminRooms;

export default withTracker((props) => {
  Meteor.subscribe('rooms.list')

  return {
    rooms: Rooms.find().fetch(),
  };
})(AdminRooms);
