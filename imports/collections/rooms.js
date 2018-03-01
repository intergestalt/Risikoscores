import { Mongo } from 'meteor/mongo';
import { tabColors } from '../config/tabColors';

const Rooms = new Mongo.Collection('rooms');

Rooms.allow({
  insert: () => (userId) => (userId || false),
  update: () => (userId) => (userId || false),
  remove: () => (userId) => (userId || false),
});

export default Rooms