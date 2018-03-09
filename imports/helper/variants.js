import { ncp } from 'ncp';
import mkdir from 'mkdir-recursive';
import fs from 'fs-extra';

import Rooms from '../collections/rooms';
import RoomSchema from '../schemas/room';
import { variants } from '../config/variants';
import { uploads_dir } from '../config/uploads';
import { convertImages } from '../helper/uploads';

// create a room variant as a copy of live (or other) variant
function initRoomVariant(key, variant, sourceVariant = 'live') {
  if (variant == 'live') return;
  let doc = Rooms.findOne({ key, variant: sourceVariant });
  doc.variant = variant;
  delete doc._id;
  Rooms.remove({ key, variant }, () => {
    Rooms.insert(doc)
  });
  copyRoomFiles(key, sourceVariant, variant)
}

// clear content of room variant
function clearRoomVariant(key, variant) {
  if (variant == 'live') return;
  let liveDoc = Rooms.findOne({ key, variant: 'live' });
  doc = {
    ...RoomSchema.clean({}),
    key,
    variant,
    name: liveDoc.name
  };

  Rooms.remove({ key, variant }, () => {
    Rooms.insert(doc)
  });
}

// delete room variant
function deleteRoomVariant(key, variant) {
  if (variant == 'live') return;
  Rooms.remove({ key, variant }, () => { });
  //deleteRoomFiles(key, variant)
}

function deleteRoomFiles(room, variant) {
  if (variant == "live") return
  const roomDir = variants.find(v => (v._id == variant)).dir
  const liveDir = variants.find(v => (v._id == "live")).dir
  if (liveDir == roomDir) {
    console.log("Not deleting room files in live directory");
    return;
  }
  const dir = uploads_dir + "/" + roomDir + (roomDir === "" ? "" : '/') + room
  console.log("removing files from " + dir)
  fs.remove(dir);
}

function copyRoomFiles(room, variantFrom, variantTo) {
  const from = variants.find(v => (v._id == variantFrom))
  const to = variants.find(v => (v._id == variantTo))
  if (!from || !to) {
    console.log("room variants to copy not found")
    return;
  }
  if (from.dir === to.dir) {
    return;
  }
  const source = uploads_dir + "/" + from.dir + (from.dir === "" ? "" : '/') + room
  const destination = uploads_dir + "/" + to.dir + (to.dir === "" ? "" : '/') + room
  console.log(`copying files from ${source} to ${destination}`)
  mkdir.mkdirSync(destination)
  ncp(source, destination, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('Room variant files copied');
    convertImages();
  });
}

export { initRoomVariant, clearRoomVariant, deleteRoomVariant }