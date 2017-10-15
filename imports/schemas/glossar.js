import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import {
  MultilingualStringSchema,
  MultilingualTextSchema
} from './multilingual';

const GlossarSchema = new SimpleSchema(
  {
    name: {
      type: MultilingualStringSchema
    },
    text: {
      type: MultilingualTextSchema
    }
  },
  {
    clean: {
      getAutoValues: true
    }
  }
);

export default GlossarSchema;
