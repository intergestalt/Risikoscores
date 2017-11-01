import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { localeStr } from '../../helper/global';
import { getRoomQuestions } from '../../helper/question';
import { DiyMarkdown } from './';
import { dist } from '../../config/styles';

class RoomQuestions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var questions = [];
    const myQuestions = getRoomQuestions(this.props.questions);
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
  questions: PropTypes.array
};

export default RoomQuestions;

const Li = styled.li`margin-top: 1em;`;
