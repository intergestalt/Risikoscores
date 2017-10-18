import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { RoomQuestionsHeader } from './';
import { localeStr } from '../../helper/global';
import { diyMarkdown } from '../../helper/diyMarkdown';
import { GlossarExpander } from './';
import { isGlossarExpanded } from '../../helper/actions';

class RoomQuestions extends React.Component {
  constructor(props) {
    super(props);
  }

  renderQuestions() {
    var result = [];
    myQuestions = this.props.questions;
    for (var i = 0; i < myQuestions.length; i++) {
      const question = myQuestions[i];
      var text = localeStr(question.text);
      const textBlocks = diyMarkdown(text, false);

      const item = <li key={'_' + i}>{textBlocks}</li>;
      result.push(item);
    }
    return <div className="RoomQuestions">{result}</div>;
  }

  render() {
    var expander = null;
    if (isGlossarExpanded()) {
      expander = (
        <div className="NavigationExpand">
          <GlossarExpander glossarExpanded={isGlossarExpanded()} />
        </div>
      );
    }
    var questions = this.renderQuestions();
    return (
      <div className="RoomQuestionsContainer">
        {expander}
        <RoomQuestionsHeader />
        {questions}
      </div>
    );
  }
}

RoomQuestions.propTypes = {
  navigationExpanded: PropTypes.bool,
  questions: PropTypes.array
};

export default RoomQuestions;
