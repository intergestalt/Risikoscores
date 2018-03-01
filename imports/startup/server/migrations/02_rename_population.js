/* eslint-disable no-console, no-undef */

// From population to wissenschaft

import { Meteor } from 'meteor/meteor';

import Rooms from '../../../collections/rooms';
import Graph from '../../../collections/graph';

let doc = null

doc = Rooms.findOne({ _id: "population" })
if (doc) {
  console.log("migrating population room")
  Rooms.remove({ _id: "population" });
  doc._id = 'wissenschaft';
  Rooms.insert(doc);
}
doc = null;

doc = Graph.findOne({ _id: "population" })
if (doc) {
  console.log("migrating population graph")
  Graph.remove({ _id: "population" });
  doc._id = 'wissenschaft';
  Graph.insert(doc);
  let docs = Graph.find({ neighbours: { $regex: "population" } }).fetch()
  for (let d of docs) {
    d.neighbours = d.neighbours.replace(/population/g, 'wissenschaft')
    Graph.update({ _id: d._id }, { $set: { neighbours: d.neighbours } })
  }
}
