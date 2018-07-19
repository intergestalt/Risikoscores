import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';

import { getStreamQuestions, setLoading } from '../../helper/question';
import { StreamWelcome, StreamPost } from './';
import { getStreamIndex, getLanguage } from '../../helper/actions';
import { colors } from '../../config/styles';

class Stream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      welcomeHeights: {}
    }
    this.handleHeightChange = this.handleHeightChange.bind(this)
  }

  handleHeightChange(heights) {
    this.setState({ welcomeHeights: heights })
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
    const streamVerticalOffset = this.props.startWelcomeState < 2 ? this.state.welcomeHeights.mediumHeight : this.state.welcomeHeights.smallHeight
    const shade = this.props.startWelcomeState == 1 || this.props.startWelcomeState == 3
    return (
      <div className="Stream">
        <StreamWelcome onHeightChange={this.handleHeightChange} />
        <Ul verticalOffset={streamVerticalOffset} shade={shade}>
          {streamPosts}
        </Ul>
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
    streamIndex: getStreamIndex(),
    lang: getLanguage(),
    startWelcomeState: Session.get('startWelcomeState')
  };
})(Stream);

const Ul = styled.ul`
  height: calc( 100% - ${ props => props.verticalOffset}px );
  transition: height 0.35s, background-color 0.25s;
  position: absolute;
  bottom: 0;
  overflow: auto;
  opacity: ${ props => props.shade ? "0.9" : "1"};
`