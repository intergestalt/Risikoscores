import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import { MultilingualStringSchema, MultilingualTextSchema } from './multilingual';

const RoomSchema = new SimpleSchema({
    
    name: {
      type: MultilingualStringSchema
    },

    mainText: {
      type: MultilingualTextSchema
    },

    subsections: {
        type: [Object],
        minCount: 1
    },

    'subsections.$.title': {
      type: MultilingualStringSchema
    },

    'subsections.$.text': {
      type: MultilingualTextSchema,
    },

    
  }, {
    clean: {
      getAutoValues: true,
    }
  }
);

export default RoomSchema;
