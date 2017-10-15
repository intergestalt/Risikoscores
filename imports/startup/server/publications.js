import { Meteor } from 'meteor/meteor';

import Rooms from '../../collections/rooms';
import Glossar from '../../collections/glossar';
import TextFragments from '../../collections/textFragments';

Meteor.publish('rooms.list', function() {
  return Rooms.find({}, { fields: { name: 1, _id: 1 } });
});

Meteor.publish('room', function(id) {
  return Rooms.find(id);
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
