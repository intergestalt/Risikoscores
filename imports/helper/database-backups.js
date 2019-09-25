import parsePath from 'parse-filepath'; // for client-side
import { execFile } from 'child_process';
import fs from 'fs';
import backup from 'mongodb-backup';
import restore from 'mongodb-restore';
import mongoUri from 'mongodb-uri';
import { parse } from 'querystring';
import dateformat from 'dateformat';

import { convertImages } from '../helper/uploads';
import { backups_dir, url_prefix, mongo_url, file_prefix, dateformat_backup, collections } from '../config/database-backups';

backupSync = Meteor.wrapAsync((options, callback) => {
  backup({
    ...options,
    callback
  })
});

restoreSync = Meteor.wrapAsync((options, callback) => {
  restore({
    ...options,
    callback
  })
});

const getFiles = () => {
  let files = []
  console.log(backups_dir, Meteor.isServer)
  const items = fs.readdirSync(backups_dir)
    .filter(item => item.indexOf(file_prefix) === 0)
    .sort()
    .reverse()
  for (var i = 0; i < items.length; i++) {
    files.push({
      name: items[i],
      url: url_prefix + "/" + items[i]
    })
  };
  return files;
}

const doBackup = () => {
  console.log("backup DB")
  const filename = file_prefix + dateformat(new Date(), dateformat_backup) + '.tar'
  let result = backupSync({
    uri: mongo_url,
    root: backups_dir,
    tar: filename,
    collections
  });
  if (result === undefined) result = filename // just assume it worked
  return result
}

const doRestore = (item) => {
  const uri = mongoUri.parse(mongo_url)
  const db_name = uri.database
  const conf = {
    uri: mongo_url,
    root: backups_dir,
    tar: item.name,
    dropCollections: collections
  }
  console.log("restore DB", item.name, conf)
  let result = restoreSync(conf);
  console.log("DB restore result", result)
  if (result === undefined) result = item // just assume it worked
  convertImages()
  return result
}

const doDelete = (item) => {
  fs.unlinkSync(backups_dir + "/" + item.name)
}

export { getFiles, doBackup, doRestore, doDelete };


/* mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase> */