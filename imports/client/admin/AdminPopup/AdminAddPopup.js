import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import AutoForm from 'uniforms-antd/AutoForm';
import { message } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import Popups from '../../../collections/popups';
import PopupSchema from '../../../schemas/popup';
import { getId } from '../../../helper/admin';

import { cleanForSave } from '../../../helper/popup';
import AdminDiyHelpContainer from '../AdminDiyHelpContainer/AdminDiyHelpContainer';

class AdminAddPopup extends React.Component {
  save(doc) {
    var popup = cleanForSave(doc);
    console.log(popup);
    Popups.insert(popup, this.saveCallback);
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
      <div className="AdminAddPopup">
        <h2>Add Popup</h2>
        <AdminDiyHelpContainer segments={['intro', 'diyMarkdownPopup']}>
          <AutoForm
            schema={PopupSchema}
            onSubmit={doc => this.save(doc)}
            model={this.props.popup}
          />
        </AdminDiyHelpContainer>
      </div>
    );
  }
}

export default AdminAddPopup;
