import { Mongo } from 'meteor/mongo';
import { tabColors } from '../config/tabColors';

const Rooms = new Mongo.Collection('rooms', {
  transform: function (doc) {
    if (!doc.subsections) return doc;
    if (!doc.color) doc.color = "white"; // default color
    tabColorsArray = tabColors(doc.color, doc.subsections.length)
    let i = 0;
    for (let s of doc.subsections) {
      s.color = tabColorsArray[i];
      i++;
    }
    return doc;
  },
});

Rooms.allow({
  insert: () => (userId) => (userId || false),
  update: () => (userId) => (userId || false),
  remove: () => (userId) => (userId || false),
});

export default Rooms