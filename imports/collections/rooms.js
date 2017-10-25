import { Mongo } from 'meteor/mongo';

const Rooms = new Mongo.Collection('rooms');

Rooms.allow({
  insert: () => (userId) => (userId || false),
  update: () => (userId) => (userId || false),
  remove: () => (userId) => (userId || false),
});

export default Rooms