import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import {
  MultilingualStringSchema,
  MultilingualTextSchema
} from './multilingual';

const RoomSchema = new SimpleSchema(
  {
    key: {
      type: String,
      uniforms: { component: () => null }
    },
    variant: {
      type: String,
      defaultValue: 'live',
      uniforms: { component: () => null }
    },

    color: {
      type: String
    },
    name: {
      type: MultilingualStringSchema
    },
    mainText: {
      type: MultilingualTextSchema
    },

    subsections: {
      type: [Object],
      minCount: 1,
      defaultValue: [{ text: { de: "Beispiel", en: "Example" } }]
    },

    images: {
      type: [Object],
      minCount: 1
    },

    'images.$.name': {
      type: String
    },
    'images.$.title': {
      type: MultilingualStringSchema
    },
    'images.$.order': {
      type: Number
    },

    'subsections.$.title': {
      type: MultilingualStringSchema
    },
    'subsections.$.identifier': {
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
