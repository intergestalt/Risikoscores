import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Questions from '../../../collections/questions';

import ListItem from './ListItem';
import { NavLink } from 'react-router-dom';

class AdminQuestions extends React.Component {
  renderQuestions(questions) {
    return (
      <div>
        <ul>
          {questions.map(entry => {
            return (
              <li key={entry._id}>
                <ListItem entry={entry} collection={Questions} />
              </li>
            );
          })}
        </ul>
        <br />
        <NavLink to={'/admin/questions-add/'}>Add Question</NavLink>
      </div>
    );
  }

  render() {
    return (
      <div className="AdminQuestions">
        <h2>Questions</h2>
        {this.renderQuestions(this.props.questions)}
        <h2>Intersections</h2>
        {this.renderQuestions(this.props.interQuestions)}
      </div>
    );
  }
}

export default withTracker(props => {
  Meteor.subscribe('questions.list');

  return {
    questions: Questions.find(
      { originRoomId: null },
      { sort: { roomId: 1, 'text.de': 1 } }
    ).fetch(),
    interQuestions: Questions.find(
      { originRoomId: { $ne: null } },
      { sort: { originRoomId: 1, 'text.de': 1 } }
    ).fetch()
  };
})(AdminQuestions);
