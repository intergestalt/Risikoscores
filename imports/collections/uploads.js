import { Mongo } from 'meteor/mongo';

const Uploads = new Mongo.Collection('uploads');

Uploads.allow({
  insert: () => userId => userId || false,
  update: () => userId => userId || false,
  remove: () => userId => userId || false
});

export default Uploads;
