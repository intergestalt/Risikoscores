import serveStatic from 'serve-static';
import express from 'express';
import { uploads_dir, cache_dir, url_prefix as uploads_url_prefix } from '../../config/uploads';
import { backups_dir, url_prefix as backups_url_prefix } from '../../config/database-backups';

// create express server
var app = express()
console.log(backups_url_prefix, uploads_url_prefix)
// serve static files
app.use(uploads_url_prefix, serveStatic(cache_dir, { 'index': false })) // check cache dir first
app.use(uploads_url_prefix, serveStatic(uploads_dir, { 'index': false })) // then uploads
app.use(backups_url_prefix, serveStatic(backups_dir, { 'index': false }))

// connect express to meteor app
WebApp.connectHandlers.use(app);

/* alternatively run on different port: app.listen(3002) */

// connect express to meteor app
WebApp.connectHandlers.use(app);

console.log("express server up")