import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import { getStreamQuestions, setLoading } from '../../helper/question';
import { StreamWelcome, StreamPost } from './';
import { getStreamIndex } from '../../helper/actions';

class Stream extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var streamPosts = [];
    var myQuestions = getStreamQuestions(
      this.props.questions,
      this.props.rooms,
      this.props.streamIndex
    );
    for (var i = myQuestions.length - 1; i >= 0; i--) {
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

export default withTracker(props => {
  return {
    streamIndex: getStreamIndex()
  };
})(Stream);
