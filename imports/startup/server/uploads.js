import fs from 'fs';
import serveStatic from 'serve-static';
import express from 'express';
import { Meteor } from 'meteor/meteor';
import { convertImages } from '../../helper/uploads';
import Rooms from '../../collections/rooms';
import { uploads_dir, cache_dir, url_prefix } from '../../config/uploads';

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

// create express server
var app = express()

// serve static files
app.use(url_prefix, serveStatic(cache_dir, { 'index': false })) // check cache dir first
app.use(url_prefix, serveStatic(uploads_dir, { 'index': false })) // then uploads

// connect express to meteor app
WebApp.connectHandlers.use(app);

/* alternatively run on different port: app.listen(3002) */

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