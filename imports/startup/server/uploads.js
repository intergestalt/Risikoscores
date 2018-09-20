import fs from 'fs';
import { Meteor } from 'meteor/meteor';
import { convertImages } from '../../helper/uploads';
import Rooms from '../../collections/rooms';
import { uploads_dir, cache_dir } from '../../config/uploads';

console.log("uploads directory: " + uploads_dir)
console.log("cache directory: " + cache_dir)

// create uploads directory if it doesn't exist
if (!fs.existsSync(uploads_dir)) {
  console.log("creating uploads directory ")
  fs.mkdirSync(uploads_dir);
}

// create cache directory if it doesn't exist
if (!fs.existsSync(cache_dir)) {
  console.log("creating cache directory ")
  fs.mkdirSync(cache_dir);
}

// listen to saves and regenerate missing
Rooms.find().observeChanges({
  changed(id, fields) {
    console.log(`Room ${id} changed.`);
    convertImages();
  }
})

// do initial conversions
Meteor.setTimeout(() => {
  console.log("Initially regenerating images");
  convertImages();
}, 5000);