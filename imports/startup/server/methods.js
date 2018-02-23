import { Meteor } from 'meteor/meteor';
import { convertImages, clearCache } from '../../helper/uploads';
import Rooms from '../../collections/rooms';
import RoomSchema from '../../schemas/room';

Meteor.methods({
  'uploads.clearCache'({ }) {
    clearCache();
  },
  'uploads.regenerateMissingImages'({ }) {
    convertImages();
  },
  'uploads.regenerateImages'({ }) {
    convertImages(true);
  },
  'initRoomVariant'({ key, variant }) {
    initRoomVariant(key, variant)
  },
  'clearRoomVariant'({ key, variant }) {
    clearRoomVariant(key, variant)
  },
  'deleteRoomVariant'({ key, variant }) {
    deleteRoomVariant(key, variant)
  }
});

function initRoomVariant(key, variant, sourceVariant = 'live') {
  if (variant == 'live') return;
  let doc = Rooms.findOne({ key, variant: sourceVariant });
  doc.variant = variant;
  delete doc._id;
  Rooms.remove({ key, variant }, () => {
    Rooms.insert(doc)
  });
}

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

function deleteRoomVariant(key, variant) {
  if (variant == 'live') return;
  Rooms.remove({ key, variant }, () => { });
}