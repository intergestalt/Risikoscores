/* eslint-disable no-console, no-undef */

// Add key and variant to rooms

import { Meteor } from 'meteor/meteor';

import Rooms from '../../../collections/rooms';

Rooms.find().forEach(room => {
  if (!room.key) {
    console.log("adding key and variant to " + room._id)
    room.key = room._id
    if (!room.variant) room.variant = 'live';
    Rooms.update(room._id, { $set: room });
  }
})
