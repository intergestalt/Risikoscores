import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Rooms from '../../../collections/rooms';
import RoomSchema from '../../../schemas/room';
import AutoForm from 'uniforms-antd/AutoForm';
import enUS from 'antd/lib/locale-provider/en_US';
import 'antd/dist/antd.css';

class AdminEditRoom extends React.Component {

  save(doc) {
    if (!doc._id) {
      Rooms.insert(doc, this.saveCallback)
    }
    else
      Rooms.update(doc._id, {
        $set: doc,
      },
        this.saveCallback
      );
  }

  saveCallback(error, data) {
    if (error) {
      alert("ERROR - NOT SAVED")
    }
    else {
      alert("SAVED")
    }
  }

  renderForm() {
    return (<AutoForm
      schema={RoomSchema}
      onSubmit={doc => this.save(doc)}
      model={this.props.room}
    />)
  }

  renderLoading() {
    return (<div>Loading...</div>)
  }

  render() {
    return (
      <div className="AdminEditRoom">
        <h2>Edit Room</h2>
        {this.props.ready ? this.renderForm() : this.renderLoading() }
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
})(AdminEditRoom);
