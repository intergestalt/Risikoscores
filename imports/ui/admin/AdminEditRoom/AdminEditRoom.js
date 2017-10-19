import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Rooms from '../../../collections/rooms';
import RoomSchema from '../../../schemas/room';

const lazy_imports = async () => {
  AutoForm = (await import('uniforms-antd/AutoForm')).default
};

import { cleanForSave } from '../../../helper/room';

class AdminEditRoom extends React.Component {
  constructor() {
    super()
    this.state = { importsReady: false }
    lazy_imports().then((err, data) => {
      if (err) console.log(err);
      this.setState({ importsReady: true });
      this.forceUpdate();
    })
  }

  save(doc) {
    let room = cleanForSave(doc);
    if (!room._id) {
      Rooms.insert(room, this.saveCallback);
    } else
      Rooms.update(
        room._id,
        {
          $set: room
        },
        this.saveCallback
      );
  }

  saveCallback(error, data) {
    if (error) {
      alert('ERROR - NOT SAVED');
    } else {
      alert('SAVED');
    }
  }

  renderForm() {
    return (
      <AutoForm
        schema={RoomSchema}
        onSubmit={doc => this.save(doc)}
        model={this.props.room}
      />
    );
  }

  renderLoading() {
    return <div>{this.state.importsReady ? 'Loading data...' : 'Loading code...'}</div>;
  }

  render() {
    return (
      <div className="AdminEditRoom">
        <link href='/vendor/antd/antd.css' type="text/css" rel="stylesheet" />
        <h2>Edit Room</h2>
        {this.props.ready && this.state.importsReady ? this.renderForm() : this.renderLoading()}
      </div>
    );
  }
}

export default withTracker(props => {
  const room_id = props.match.params._id;
  const sub = Meteor.subscribe('room', room_id);

  return {
    room: Rooms.findOne(room_id),
    ready: sub.ready()
  };
})(AdminEditRoom);
