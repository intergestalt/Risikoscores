import { Mongo } from 'meteor/mongo';

const Graph = new Mongo.Collection('graph');

Graph.allow({
  insert: () => userId => userId || false,
  update: () => userId => userId || false,
  remove: () => userId => userId || false
});

export default Graph;
