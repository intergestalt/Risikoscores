import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Questions from '../../../collections/questions';
import QuestionSchema from '../../../schemas/question';
import AutoForm from 'uniforms-antd/AutoForm';
import { message } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import { cleanForSave } from '../../../helper/question';
import AdminDiyHelpContainer from '../AdminDiyHelpContainer/AdminDiyHelpContainer';

class AdminAddQuestion extends React.Component {
  save(doc) {
    let question = cleanForSave(doc);
    Questions.insert(question, this.saveCallback);
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
      <div className="AdminAddQuestion">
        <h2>Add Question</h2>
        <AdminDiyHelpContainer segments={['intro', 'diyMarkdownLink']}>
          <AutoForm
            schema={QuestionSchema}
            onSubmit={doc => this.save(doc)}
            model={this.props.question}
          />
        </AdminDiyHelpContainer>
      </div>
    );
  }
}

export default AdminAddQuestion;
