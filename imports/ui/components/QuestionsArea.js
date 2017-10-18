import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Questions from '../../collections/questions';
import { RoomQuestions, Expander, RoomQuestionsHeader } from './';
import { toggleQuestions, isQuestionsExpanded } from '../../helper/actions';

class QuestionsArea extends React.Component {
  constructor(props) {
    super(props);
    this.callback = this.callback.bind(this);
  }

  callback(e) {
    toggleQuestions(e);
  }

  renderLoading() {
    return <div className="QuestionsArea">Loading...</div>;
  }
  render() {
    if (!this.props.ready) {
      return this.renderLoading();
    }
    //questionsExpanded == true => height:60%
    //questionsExpanded == false => height:33%
    var height = 33;
    if (this.props.questionsExpanded) {
      height = 60;
    }
    return (
      <div className="QuestionsArea">
        <h1>Questions: {height}%</h1>
        <Expander callback={this.callback} expanded={isQuestionsExpanded()} />
        <RoomQuestionsHeader />
        <RoomQuestions questions={this.props.questions} />
      </div>
    );
  }
}

QuestionsArea.propTypes = {
  room: PropTypes.object
};

export default withTracker(props => {
  const sub = Meteor.subscribe('questions.list');

  return {
    questions: Questions.find().fetch(),
    ready: sub.ready(),
    questionsExpanded: isQuestionsExpanded()
  };
})(QuestionsArea);
