import { Meteor } from 'meteor/meteor';
import { convertImages, clearCache } from '../../helper/uploads';
import {
  setRoomVariantNormal,
  initRoomVariant,
  clearRoomVariant,
  deleteRoomVariant
} from '../../helper/variants';

Meteor.methods({
  'uploads.clearCache'({}) {
    clearCache();
  },
  'uploads.regenerateMissingImages'({}) {
    convertImages();
  },
  'uploads.regenerateImages'({}) {
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
  }
});
