import { Meteor } from 'meteor/meteor';

import Rooms from '../../collections/rooms';

Meteor.publish('rooms.list', function () {
  return Rooms.find({},{fields: {name:1, _id:1}});
});

Meteor.publish('room', function (id) {
  return Rooms.find(id);
});