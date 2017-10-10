import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import LongTextField from 'uniforms-antd/LongTextField';

const RoomSchema = new SimpleSchema({
    name: {
      type: String
    },
    mainText: {
      type:String,
      uniforms: {
        component: LongTextField,
      },
    },

    subsections: {
        type: [Object],
        minCount: 1
    },

    'subsections.$.title': {
      type:String
    },

    'subsections.$.text': {
      type:String,
      uniforms: {
        component: LongTextField,
      },
    },

    
  }, {
    clean: {
      getAutoValues: true,
    }
  }
);

export default RoomSchema;
