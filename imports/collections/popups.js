import { Mongo } from 'meteor/mongo';

const Popups = new Mongo.Collection('popups');

Popups.allow({
  insert: () => userId => userId || false,
  update: () => userId => userId || false,
  remove: () => userId => userId || false
});

export default Popups;
