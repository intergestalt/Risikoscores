import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import {
  MultilingualStringSchema,
  MultilingualTextSchema
} from './multilingual';

const QuestionSchema = new SimpleSchema(
  {
    text: {
      type: MultilingualTextSchema
    },
    roomId: {
      type: String
    },
    originRoomId: {
      type: String,
      optional: true
    },
    image: {
      type: String,
      optional: true
    }
  },
  {
    clean: {
      getAutoValues: true
    }
  }
);

export default QuestionSchema;
