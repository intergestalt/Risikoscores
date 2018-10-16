import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import {
  MultilingualOptionalTextSchema,
  MultilingualOptionalStringSchema
} from './multilingual';

const PopupSchema = new SimpleSchema(
  {
    key: {
      type: String
    },

    type: {
      type: String
    },

    targetRoomId: {
      type: String
    },

    title: {
      type: MultilingualOptionalStringSchema,
      optional: true
    },
    text1: {
      type: MultilingualOptionalTextSchema,
      optional: true
    },
    text2: {
      type: MultilingualOptionalTextSchema,
      optional: true
    },
    text3: {
      type: MultilingualOptionalTextSchema,
      optional: true
    },
    image: {
      type: MultilingualOptionalStringSchema,
      optional: true
    },
    soundPopup: {
      type: Boolean,
      optional: false,
      defaultValue: false
    }
  },
  {
    clean: {
      getAutoValues: true
    }
  }
);

export default PopupSchema;
