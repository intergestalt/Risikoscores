import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Questions from '../../collections/questions';
import { localeStr, shuffleArray } from '../../helper/global';
import { DiyMarkdown, Loading } from './';
import { dist } from '../../config/styles';
import { existsString, exists } from '../../helper/global';

class RoomQuestions extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    console.log(nextProps);
    return true;
  }

  renderLoading() {
    return (
      <div className="QuestionsArea">
        <Loading />
      </div>
    );
  }
  renderQuestions(questions) {}

  render() {
    if (!this.props.ready) {
      return this.renderLoading();
    }
    var questions = [];
    const myQuestions = this.props.questions;
    for (var i = 0; i < myQuestions.length; i++) {
      const question = myQuestions[i];
      var text = localeStr(question.text);

      const item = (
        <Li key={'_' + i}>
          <DiyMarkdown>{text}</DiyMarkdown>
        </Li>
      );
      questions.push(item);
    }
    return <ul className="RoomQuestions">{questions}</ul>;
  }
}

RoomQuestions.propTypes = {
  roomId: PropTypes.string,
  targetId: PropTypes.string
};

export default withTracker(props => {
  var sub;
  var questions;
  if (exists(props.targetId)) {
    sub = Meteor.subscribe('questions.listByOrigin', props.roomId);
    questions = Questions.find(
      { originRoomId: props.roomId, roomId: props.targetId },
      { sort: { _id: 1 } }
    ).fetch();
  } else {
    sub = Meteor.subscribe('questions.listByRoom', props.roomId);
    questions = shuffleArray(
      Questions.find(
        { originRoomId: null, roomId: props.roomId },
        { sort: { _id: 1 } }
      ).fetch()
    );
  }

  return {
    questions: questions,
    ready: sub.ready()
  };
})(RoomQuestions);

const Li = styled.li`
  margin-top: 1em;
`;
