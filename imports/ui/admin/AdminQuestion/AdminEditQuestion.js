import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Questions from '../../../collections/questions';
import QuestionSchema from '../../../schemas/question';
import AutoForm from 'uniforms-antd/AutoForm';
import enUS from 'antd/lib/locale-provider/en_US';

import { cleanForSave } from '../../../helper/question';

class AdminEditQuestion extends React.Component {
  save(doc) {
    let question = cleanForSave(doc);
    if (!question._id) {
      Questions.insert(question, this.saveCallback);
    } else
      Questions.update(
        question._id,
        {
          $set: question
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
        schema={QuestionSchema}
        onSubmit={doc => this.save(doc)}
        model={this.props.question}
      />
    );
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  render() {
    return (
      <div className="AdminEditQuestion">
        <h2>Edit Question</h2>
        {this.props.ready ? this.renderForm() : this.renderLoading()}
      </div>
    );
  }
}

export default withTracker(props => {
  const question_id = props.match.params._id;
  const sub = Meteor.subscribe('questions', question_id);

  return {
    question: Questions.findOne(question_id),
    ready: sub.ready()
  };
})(AdminEditQuestion);
