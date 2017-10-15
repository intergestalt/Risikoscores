import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Glossar from '../../../collections/glossar';
import GlossarSchema from '../../../schemas/glossar';
import AutoForm from 'uniforms-antd/AutoForm';
import enUS from 'antd/lib/locale-provider/en_US';
import 'antd/dist/antd.css';

import { cleanForSave } from '../../../helper/glossar';

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
      alert('ERROR - NOT SAVED');
    } else {
      alert('SAVED');
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
        {this.props.ready ? this.renderForm() : this.renderLoading()}
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
