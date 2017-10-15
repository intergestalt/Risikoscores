import { Mongo } from 'meteor/mongo';

const TextFragments = new Mongo.Collection('textFragments');

TextFragments.allow({
  insert: () => userId => userId || false,
  update: () => userId => userId || false,
  remove: () => userId => userId || false
});

export default TextFragments;
