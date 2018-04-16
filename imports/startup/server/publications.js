import { Meteor } from 'meteor/meteor';

import Rooms from '../../collections/rooms';
import Glossar from '../../collections/glossar';
import TextFragments from '../../collections/textFragments';
import Graph from '../../collections/graph';
import Questions from '../../collections/questions';
import UploadsStatus from '../../collections/uploadsStatus';
import Uploads from '../../collections/uploads';

Meteor.publish('rooms.list', function(variant = 'live') {
  return Rooms.find({ variant }, { fields: { name: 1, _id: 1, key: 1 } });
});

Meteor.publish('room', function(key, variant = 'live') {
  return Rooms.find({ key, variant });
});

Meteor.publish('room.variants.list', function(key) {
  return Rooms.find({ key } /*,{ fields: { variant: 1, key: 1, _id: 1 } }*/);
});

Meteor.publish('glossar.list', function() {
  return Glossar.find({});
});

Meteor.publish('glossar', function(id) {
  return Glossar.find(id);
});

Meteor.publish('fragments.list', function() {
  return TextFragments.find({});
});

Meteor.publish('fragments', function(id) {
  return TextFragments.find(id);
});

Meteor.publish('questions.list', function() {
  return Questions.find({});
});

Meteor.publish('questions.listByRoom', function(roomId) {
  return Questions.find({ roomId });
});
Meteor.publish('questions.listByOrigin', function(roomId) {
  return Questions.find({ originRoomId: roomId });
});

Meteor.publish('questions', function(id) {
  return Questions.find(id);
});

Meteor.publish('graph.list', function() {
  return Graph.find({});
});

Meteor.publish('graph', function(id) {
  return Graph.find(id);
});

Meteor.publish('uploadStatus.list', function() {
  return UploadsStatus.find();
});

Meteor.publish('uploads.list', function() {
  return Uploads.find();
});
