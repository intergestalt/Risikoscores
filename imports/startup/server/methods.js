import { Meteor } from 'meteor/meteor';
import { convertImages, clearCache } from '../../helper/uploads';

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
});