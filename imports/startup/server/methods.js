import { Meteor } from 'meteor/meteor';
import { convertImages, clearCache } from '../../helper/uploads';
import {
  setRoomVariantNormal,
  initRoomVariant,
  clearRoomVariant,
  deleteRoomVariant
} from '../../helper/variants';
import { getFiles, doBackup } from '../../helper/database-backups';

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
  initRoomVariant({ key, variant }) {
    initRoomVariant(key, variant);
  },
  clearRoomVariant({ key, variant }) {
    clearRoomVariant(key, variant);
  },
  deleteRoomVariant({ key, variant }) {
    deleteRoomVariant(key, variant);
  },
  setRoomVariantNormal({ key, variant }) {
    setRoomVariantNormal(key, variant);
  },
  'backups.getFiles'() {
    return getFiles()
  },
  'backups.doBackup'(item) {
    return doBackup(item)
  },
  'backups.doRestore'(item) {
    return doRestore(item)
  },
  'backups.delete'(item) {
    return doDelete(item)
  }
});
