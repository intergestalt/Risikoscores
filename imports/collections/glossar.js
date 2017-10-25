import { Mongo } from 'meteor/mongo';

const Glossar = new Mongo.Collection('glossar');

Glossar.allow({
  insert: () => userId => userId || false,
  update: () => userId => userId || false,
  remove: () => userId => userId || false
});

export default Glossar;
