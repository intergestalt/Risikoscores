import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { localeStr } from '../../helper/global';
import { getRoomQuestions } from '../../helper/question';
import { diyMarkdown } from '../../helper/diyMarkdown';

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
      const textBlocks = diyMarkdown(text, false);

      const item = <li key={'_' + i}>{textBlocks}</li>;
      questions.push(item);
    }
    return <div className="RoomQuestions">{questions}</div>;
  }
}

RoomQuestions.propTypes = {
  questions: PropTypes.array
};

export default RoomQuestions;
