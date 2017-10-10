import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import LongTextField from 'uniforms-antd/LongTextField';

const MultilingualTextSchema = new SimpleSchema({
    en: {
      type:String,
      uniforms: {
        component: LongTextField,
        className: "languageField",
      },
    },
    de: {
      type:String,
      uniforms: {
        component: LongTextField,
        className: "languageField",
      },
    },    
  }, {
    clean: {
      getAutoValues: true,
    }
  }
);

const MultilingualStringSchema = new SimpleSchema({
  en: {
    type: String,
    uniforms: {
      className: "languageField",
    }
  },
  de: {
    type: String,
    uniforms: {
      className: "languageField",
    }    
  },
}, {
  clean: {
    getAutoValues: true,
  }
}
);

export { MultilingualStringSchema, MultilingualTextSchema };
