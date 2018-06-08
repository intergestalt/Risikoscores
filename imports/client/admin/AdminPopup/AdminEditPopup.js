import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Popups from '../../../collections/popups';
import PopupSchema from '../../../schemas/popup';
import AutoForm from 'uniforms-antd/AutoForm';
import { message } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import { cleanForSave } from '../../../helper/popup';
import AdminDiyHelpContainer from '../AdminDiyHelpContainer/AdminDiyHelpContainer';
import { getUnUrl } from '../../../helper/global';

class AdminEditPopup extends React.Component {
  save(doc) {
    let popup = cleanForSave(doc);
    if (!popup._id) {
      Popups.insert(popup, this.saveCallback);
    } else
      Popups.update(
        popup._id,
        {
          $set: popup
        },
        this.saveCallback
      );
  }

  saveCallback(error, data) {
    if (error) {
      message.success('Error - not saved');
    } else {
      message.success('Saved');
    }
  }

  renderForm() {
    return (
      <AutoForm
        schema={PopupSchema}
        onSubmit={doc => this.save(doc)}
        model={this.props.popup}
      />
    );
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  render() {
    return (
      <div className="AdminEditPopup">
        <h2>Edit Popup</h2>
        <AdminDiyHelpContainer segments={['intro', 'diyMarkdownPopup']}>
          {this.props.ready ? this.renderForm() : this.renderLoading()}
        </AdminDiyHelpContainer>
      </div>
    );
  }
}

export default withTracker(props => {
  var popup_id = getUnUrl(props.match.params._id);
  const sub = Meteor.subscribe('popup', popup_id);
  return {
    popup: Popups.findOne(popup_id),
    ready: sub.ready()
  };
})(AdminEditPopup);
