import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Rooms from '../../../collections/rooms';
import RoomSchema from '../../../schemas/room';
import AdminDiyHelpContainer from '../AdminDiyHelpContainer';

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

    // workaround for bug of tabs which don't update their order in ui
    this.tabOrderChanged = false;
    this.tabOrderChanged = doc.subsections.length != this.props.room.subsections.length
    if (!this.tabOrderChanged) {
      for (let i in doc.subsections) {
        console.log(doc.subsections[i].order, this.props.room.subsections[i].order)
        if (doc.subsections[i].order != this.props.room.subsections[i].order) {
          this.tabOrderChanged = true;
          break;
        }
      }
    }

    if (!room._id) {
      console.log('INSERT:');
      console.log(room);
      Rooms.insert(room, this.saveCallback);
    } else {
      console.log('UPDATE ID:' + room._id);
      console.log(room);
      Rooms.update(
        room._id,
        {
          $set: room
        },
        (error, data) => { this.saveCallback(error, data, doc) }
      );
    }
  }

  saveCallback(error, data, doc) {
    if (error) {
      alert('ERROR - NOT SAVED');
    } else {
      alert('SAVED');
      if (this.tabOrderChanged) {
        location.reload();
      }
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
        <h2>Edit Room</h2>
        <AdminDiyHelpContainer segments={['intro', 'diyMarkdownIntro', 'diyMarkdownRoom']}>
          {this.props.ready && this.state.importsReady ? this.renderForm() : this.renderLoading()}
        </AdminDiyHelpContainer>
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
