/* eslint-disable no-console, no-undef */

import { Meteor } from 'meteor/meteor';

import Rooms from '../../collections/rooms';
import Graph from '../../collections/graph';

let doc = null

// rooms: programmierbüro -> programmierbuero
doc = Rooms.findOne({ _id: { $regex: "programmierb..ro" } })
//console.log(doc._id, doc._id.substr(13, 1))
if (doc && doc._id.substr(13, 1) != 'e') {
  console.log("migrating programmierbüro room")
  Rooms.remove({ _id: { $regex: "programmierb..ro" } });
  doc._id = 'programmierbuero';
  Rooms.insert(doc);
}
doc = null;

// graph: programmierbüro -> programmierbuero
doc = Graph.findOne({ _id: { $regex: "programmierb..ro" } })
if (doc && doc._id.substr(13, 1) != 'e') {
  console.log("migrating programmierbüro graph")
  Graph.remove({ _id: { $regex: "programmierb..ro" } });
  doc._id = 'programmierbuero';
  Graph.insert(doc);
  let docs = Graph.find({ neighbours: { $regex: "programmierb..ro" } }).fetch()
  for (let d of docs) {
    d.neighbours = d.neighbours.replace(/programmierb..ro/g, 'programmierbuero')
    Graph.update({ _id: d._id }, { $set: { neighbours: d.neighbours } })
  }
}

