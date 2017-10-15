import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import AutoForm from 'uniforms-antd/AutoForm';
import enUS from 'antd/lib/locale-provider/en_US';
import 'antd/dist/antd.css';

import Glossar from '../../../collections/glossar';
import GlossarSchema from '../../../schemas/glossar';
import { getId } from '../../../helper/admin';

import { cleanForSave } from '../../../helper/glossar';

class AdminAddGlossar extends React.Component {
  save(doc) {
    var glossar = cleanForSave(doc);
    glossar._id = getId(glossar.name.de);
    console.log(glossar);
    Glossar.insert(glossar, this.saveCallback);
  }

  saveCallback(error, data) {
    if (error) {
      alert('ERROR - NOT SAVED');
    } else {
      alert('SAVED');
    }
  }

  render() {
    return (
      <div className="AdminAddGlossar">
        <h2>Add Glossar Entry</h2>
        <AutoForm
          schema={GlossarSchema}
          onSubmit={doc => this.save(doc)}
          model={this.props.glossar}
        />
      </div>
    );
  }
}

export default AdminAddGlossar;
