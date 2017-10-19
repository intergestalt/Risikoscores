import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getStreamQuestions, setLoading } from '../../helper/question';
import { StreamWelcome, StreamPost } from './';

class Stream extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var streamPosts = [];
    var myQuestions = getStreamQuestions(
      this.props.questions,
      this.props.rooms
    );
    for (var i = 0; i < myQuestions.length; i++) {
      const question = myQuestions[i];
      const item = (
        <StreamPost
          loading={question.loading}
          key={'_' + i}
          question={question}
        />
      );
      streamPosts.push(item);
      setLoading(i, false);
    }
    return (
      <div className="Stream">
        <ul>
          <StreamWelcome />
          {streamPosts}
        </ul>
      </div>
    );
  }
}

Stream.propTypes = {
  questions: PropTypes.array,
  rooms: PropTypes.array
};

export default Stream;
