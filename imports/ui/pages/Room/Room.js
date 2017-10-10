import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Rooms from '../../../collections/rooms';


class Room extends React.Component {

  renderLoading() {
    return (<div>Loading...</div>)
  }

  renderTabs() {
    return (
      <ul>
      Tabs
      {
        this.props.room.subsections.map((tab)=>{
          return (<li>
            {tab.text}
            </li>)
        })
      }
    </ul>)
  }

  renderRoom() {
    console.log(this.props.room)
    return ( // why do I still have to return a useless wrapper? see https://reactjs.org/blog/2017/09/26/react-v16.0.html
      <div className="roomColumns">
        <div className="roomColumn">{this.props.room.name}</div>
        <div className="roomColumn">
          {this.props.room.subsections && this.renderTabs()}
        </div>
        <div className="roomColumn">
          Col 3
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="Room">
        <h2>Room</h2>
        {this.props.ready ? this.renderRoom() : this.renderLoading() }
      </div>
    );
  }
}

export default withTracker((props) => {
  const room_id = props.match.params._id;
  const sub = Meteor.subscribe('room', room_id)

  return {
    room: Rooms.findOne(room_id),
    ready: sub.ready(),
  };
})(Room);
