import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import Rooms from '../../../collections/rooms';
import RoomSchema from '../../../schemas/room';
import AdminDiyHelpContainer from '../AdminDiyHelpContainer';
import { RoomChooser } from '../AdminHelpers';

const lazy_imports = async () => {
  AutoForm = (await import('uniforms-antd/AutoForm')).default;
  message = (await import('antd')).message
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
    this.save = this.save.bind(this)
  }

  save(doc) {
    let room = cleanForSave(doc);

    // workaround for bug of reordered tabs which don't update their position in ui
    this.tabOrderChanged = false;
    if (this.props.room && this.props.room.subsections) {
      this.tabOrderChanged = (doc.subsections.length != this.props.room.subsections.length)
      if (!this.tabOrderChanged) {
        for (let i in doc.subsections) {
          //console.log(doc.subsections[i].order, this.props.room.subsections[i].order)
          if (doc.subsections[i].order != this.props.room.subsections[i].order) {
            this.tabOrderChanged = true;
            break;
          }
        }
      }
    }

    console.log("SAVING:", room)

    if (room._new) {
      delete room._new;
      Rooms.insert(
        room,
        (error, data) => { this.saveCallback(error, data, doc) }
      )
    }
    Rooms.update(
      room._id,
      {
        $set: room
      },
      (error, data) => { this.saveCallback(error, data, doc) }
    );
  }

  saveCallback(error, data, doc) {
    if (error) {
      message.error('Error - not saved');
      console.log(error)
    } else {
      message.success('Saved');
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
        <h2>Edit Room <i>{this.props.room_id}</i>  <RoomChooser roomKey={this.props.room_id} controls /></h2>
        <AdminDiyHelpContainer segments={['intro', 'diyMarkdownIntro', 'diyMarkdownLink', 'diyMarkdownGlossar', 'diyMarkdownRoom']}>
          {this.props.ready && this.state.importsReady ? this.renderForm() : this.renderLoading()}
        </AdminDiyHelpContainer>
      </div>
    );
  }
}

export default withTracker(props => {
  const room_id = props.match.params._id;
  const roomVariant = Session.get("roomVariant");
  const sub = Meteor.subscribe('room', room_id, roomVariant);
  let room = Rooms.findOne({ key: room_id, variant: roomVariant });
  if (sub.ready() && !room) room = {
    _new: true,
    key: room_id,
    variant: roomVariant
  }

  console.log(room_id, roomVariant, room)

  return {
    room,
    room_id,
    ready: sub.ready()
  };
})(AdminEditRoom);
