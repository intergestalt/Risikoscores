import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';

import Rooms from '../../../collections/rooms';


class Start extends React.Component {

  renderRooms(rooms) {
    return (
      <ul>{
      rooms.map((room)=>{
      return (<li>
          <NavLink to={'rooms/'+room._id}>{room.name}</NavLink>
        </li>)
    })}</ul>
    )
  }

  render() {
    return (
      <div className="Start">
        <h2>Rooms</h2>
        {this.renderRooms(this.props.rooms)}
      </div>
    );
  }
}

export default withTracker((props) => {
  Meteor.subscribe('rooms.list')

  return {
    rooms: Rooms.find().fetch(),
  };
})(Start);
