import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import LongTextField from 'uniforms-antd/LongTextField';

const MultilingualTextSchema = new SimpleSchema(
  {
    de: {
      type: String,
      uniforms: {
        component: LongTextField,
        className: 'languageField'
      }
    },
    en: {
      type: String,
      uniforms: {
        component: LongTextField,
        className: 'languageField'
      },
      optional: true
    }
  },
  {
    clean: {
      getAutoValues: true
    }
  }
);
const MultilingualOptionalTextSchema = new SimpleSchema(
  {
    de: {
      type: String,
      uniforms: {
        component: LongTextField,
        className: 'languageField'
      },
      optional: true
    },
    en: {
      type: String,
      uniforms: {
        component: LongTextField,
        className: 'languageField'
      },
      optional: true
    }
  },
  {
    clean: {
      getAutoValues: true
    }
  }
);
const MultilingualStringSchema = new SimpleSchema(
  {
    de: {
      type: String,
      uniforms: {
        className: 'languageField'
      }
    },
    en: {
      type: String,
      uniforms: {
        className: 'languageField'
      },
      optional: true
    }
  },
  {
    clean: {
      getAutoValues: true
    }
  }
);
const MultilingualOptionalStringSchema = new SimpleSchema(
  {
    de: {
      type: String,
      uniforms: {
        className: 'languageField'
      }
    },
    en: {
      type: String,
      uniforms: {
        className: 'languageField'
      },
      optional: true
    }
  },
  {
    clean: {
      getAutoValues: true
    }
  }
);
export {
  MultilingualStringSchema,
  MultilingualTextSchema,
  MultilingualOptionalTextSchema,
  MultilingualOptionalStringSchema
};
