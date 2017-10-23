import { Mongo } from 'meteor/mongo';

const Questions = new Mongo.Collection('questions');

Questions.allow({
  insert: () => userId => userId || false,
  update: () => userId => userId || false,
  remove: () => userId => userId || false
});

export default Questions;
