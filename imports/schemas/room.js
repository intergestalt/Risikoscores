import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import {
  MultilingualStringSchema,
  MultilingualTextSchema
} from './multilingual';

const RoomSchema = new SimpleSchema(
  {
    name: {
      type: MultilingualStringSchema
    },
    folder: {
      type: String
    },
    mainText: {
      type: MultilingualTextSchema
    },

    subsections: {
      type: [Object],
      minCount: 1
    },

    images: {
      type: [Object],
      minCount: 1
    },

    'images.$.name': {
      type: String
    },
    'images.$.order': {
      type: Number
    },

    'subsections.$.title': {
      type: MultilingualStringSchema
    },
    'subsections.$.subfolder': {
      type: String
    },
    'subsections.$.text': {
      type: MultilingualTextSchema
    },

    'subsections.$.order': {
      type: Number,
      optional: true
    }
  },
  {
    clean: {
      getAutoValues: true
    }
  }
);

export default RoomSchema;
