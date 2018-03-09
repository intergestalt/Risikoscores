import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import AutoForm from 'uniforms-antd/AutoForm';
import { message } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import Glossar from '../../../collections/glossar';
import GlossarSchema from '../../../schemas/glossar';
import { getId } from '../../../helper/admin';

import { cleanForSave } from '../../../helper/glossar';
import AdminDiyHelpContainer from '../AdminDiyHelpContainer/AdminDiyHelpContainer';

class AdminAddGlossar extends React.Component {
  save(doc) {
    var glossar = cleanForSave(doc);
    glossar._id = getId(glossar.name.de);
    console.log(glossar);
    Glossar.insert(glossar, this.saveCallback);
  }

  saveCallback(error, data) {
    if (error) {
      message.success('Error - not saved');
    } else {
      message.success('Saved');
    }
  }

  render() {
    return (
      <div className="AdminAddGlossar">
        <h2>Add Glossar Entry</h2>
        <AdminDiyHelpContainer segments={['intro', 'diyMarkdownGlossar']}>
          <AutoForm
            schema={GlossarSchema}
            onSubmit={doc => this.save(doc)}
            model={this.props.glossar}
          />
        </AdminDiyHelpContainer>
      </div>
    );
  }
}

export default AdminAddGlossar;
