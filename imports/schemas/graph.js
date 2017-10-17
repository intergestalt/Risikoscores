import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const GraphNodeSchema = new SimpleSchema(
  {
    pseudo: {
      type: Boolean
    },
    x: {
      type: Number
    },
    y: {
      type: Number
    },
    neighbours: {
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

export default GraphNodeSchema;
