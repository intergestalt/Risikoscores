import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Questions from '../../collections/questions';
import {
  localeStr,
  shuffleArray,
  existsString,
  exists
} from '../../helper/global';
import { DiyMarkdown, Loading } from './';
import { dist } from '../../config/styles';
import { getQuestions } from '../../helper/question';
import { getCachedQuestions } from '../../helper/actions';

class RoomQuestions extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
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
    if (!exists(this.props.questions)) {
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
  var questions = [];
  if (exists(props.targetId)) {
    /*  sub = Meteor.subscribe('questions.listByOrigin', props.roomId);
    questions = Questions.find(
      {
        originRoomId: props.roomId,
        roomId: props.targetId
      },
      { sort: { _id: 1 } }
    ).fetch();*/
    //    question = Questions.findOne({
    questions = shuffleArray(getQuestions(props.roomId, props.targetId));
  } else {
    questions = shuffleArray(getQuestions(props.roomId));
  }

  return {
    questions: questions
  };
})(RoomQuestions);

const Li = styled.li`
  margin-top: 1em;
`;
