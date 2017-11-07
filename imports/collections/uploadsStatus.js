import { Mongo } from 'meteor/mongo';

const UploadsStatus = new Mongo.Collection('uploads_status');

UploadsStatus.allow({
  insert: () => userId => userId || false,
  update: () => userId => userId || false,
  remove: () => userId => userId || false
});

export default UploadsStatus;
