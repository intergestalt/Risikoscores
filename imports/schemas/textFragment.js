import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import {
  MultilingualStringSchema,
  MultilingualTextSchema
} from './multilingual';

const TextFragmentSchema = new SimpleSchema(
  {
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

export default TextFragmentSchema;
