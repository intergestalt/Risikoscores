import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Glossar from '../../../collections/glossar';
import GlossarSchema from '../../../schemas/glossar';
import AutoForm from 'uniforms-antd/AutoForm';
import { message } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import { cleanForSave } from '../../../helper/glossar';
import AdminDiyHelpContainer from '../AdminDiyHelpContainer/AdminDiyHelpContainer';

class AdminEditGlossar extends React.Component {
  save(doc) {
    let glossar = cleanForSave(doc);
    if (!glossar._id) {
      Glossar.insert(glossar, this.saveCallback);
    } else
      Glossar.update(
        glossar._id,
        {
          $set: glossar
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
        schema={GlossarSchema}
        onSubmit={doc => this.save(doc)}
        model={this.props.glossar}
      />
    );
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  render() {
    return (
      <div className="AdminEditGlossar">
        <h2>Edit Glossar</h2>
        <AdminDiyHelpContainer segments={['intro', 'diyMarkdownGlossar']}>
          {this.props.ready ? this.renderForm() : this.renderLoading()}
        </AdminDiyHelpContainer>

      </div>
    );
  }
}

export default withTracker(props => {
  const glossar_id = props.match.params._id;
  const sub = Meteor.subscribe('glossar', glossar_id);

  return {
    glossar: Glossar.findOne(glossar_id),
    ready: sub.ready()
  };
})(AdminEditGlossar);
