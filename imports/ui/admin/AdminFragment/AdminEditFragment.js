import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import TextFragments from '../../../collections/textFragments';
import TextFragmentSchema from '../../../schemas/textFragment';
import AutoForm from 'uniforms-antd/AutoForm';
import enUS from 'antd/lib/locale-provider/en_US';
import 'antd/dist/antd.css';

import { cleanForSave } from '../../../helper/fragment';

class AdminEditFragment extends React.Component {
  save(doc) {
    let fragment = cleanForSave(doc);
    if (!fragment._id) {
      TextFragments.insert(fragment, this.saveCallback);
    } else
      TextFragments.update(
        fragment._id,
        {
          $set: fragment
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
        schema={TextFragmentSchema}
        onSubmit={doc => this.save(doc)}
        model={this.props.fragment}
      />
    );
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  render() {
    return (
      <div className="AdminEditFragment">
        <h2>Edit Text Fragment</h2>
        {this.props.ready ? this.renderForm() : this.renderLoading()}
      </div>
    );
  }
}

export default withTracker(props => {
  const fragment_id = props.match.params._id;
  const sub = Meteor.subscribe('fragments', fragment_id);

  return {
    fragment: TextFragments.findOne(fragment_id),
    ready: sub.ready()
  };
})(AdminEditFragment);
