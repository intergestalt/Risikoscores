import fs from 'fs';
import serveStatic from 'serve-static';
import express from 'express';
import { Meteor } from 'meteor/meteor';
import { convertImages } from '../../helper/uploads';

// configure uploads directory using environment variable
var_dir = process.env.RISIKOSCORES_VAR_DIR || process.env.PWD + '/var';
uploads_dir = var_dir + "/uploads";
cache_dir = var_dir + "/cache";
console.log("uploads directory: " + uploads_dir)
console.log("cache directory: " + cache_dir)

// make paths global
global.uploads_dir = uploads_dir
global.cache_dir = cache_dir

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
app.use('/uploads', serveStatic(cache_dir, { 'index': false })) // check cache dir first
app.use('/uploads', serveStatic(uploads_dir, { 'index': false })) // then uploads

// connect express to meteor app
WebApp.connectHandlers.use(app);

/* alternatively run on different port: app.listen(3002) */

// do initial conversions
Meteor.setTimeout(() => {
  //console.log("Initially regenerating images");
  //convertImages();
}, 5000);