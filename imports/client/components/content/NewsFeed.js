import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StreamPost } from '../';
import { zuffi } from '../../../helper/global';

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    const data = props.data;
    const rows = data.rows;
    this.questions = [];
    for (var i = 0; i < rows.length; i++) {
      var question = {};
      const row = rows[i];
      question.text = row.text;
      question.title = row.year;
      question.roomId = data.context.room;
      question.loading = true;
      this.questions.push(question);
    }
    this.state = { feedIndex: 1, loading: true };
    this.waitTimeOut = null;
    this.loadingTimeOut = null;
  }
  componentDidMount() {
    this.setLoadingTimeOut();
  }

  componentWillUnmount() {
    if (this.waitTimeOut) {
      clearTimeout(this.waitTimeOut);
      this.waitTimeOut = null;
    }
    if (this.loadingTimeOut) {
      clearTimeout(this.loadingTimeOut);
      this.loadingTimeOut = null;
    }
  }
  getDelay() {
    var zuffiDelay = 2;
    zuffiDelay *= 1000;
    const zuffiOffset = Math.trunc(zuffiDelay / 2);
    const delay = zuffi(zuffiDelay) + zuffiOffset;
    return delay;
  }
  timeOut() {
    this.timeout = setTimeout(() => {
      this.setWaitTimeOut();
    }, this.getDelay() / 2);
  }

  setWaitTimeOut() {
    this.waitTimeOut = setTimeout(() => {
      this.setState({
        loading: true
      });
      this.incFeedIndex();
      this.setLoadingTimeOut();
    }, this.getDelay());
  }

  setLoadingTimeOut() {
    this.loadingTimeOut = setTimeout(() => {
      var i = this.state.feedIndex - 1;
      this.setState({
        loading: false
      });
      this.setWaitTimeOut();
    }, this.getDelay());
  }

  incFeedIndex() {
    var i = this.state.feedIndex;
    i++;
    if (i > this.questions.length - 1) {
      i = question.length - 1;
    }
    this.setState({ feedIndex: i });
  }

  getStreamQuestions(index) {
    if (index > this.questions.length) {
      index = this.questions.length;
    }
    return this.questions.slice(0, index);
  }

  render() {
    var streamPosts = [];
    var myQuestions = this.getStreamQuestions(this.state.feedIndex);
    var first = true;
    for (var i = myQuestions.length - 1; i >= 0; i--) {
      var loading = false;
      if (first) {
        first = false;
        if (this.state.loading) {
          loading = true;
        }
      }
      const question = myQuestions[i];

      const item = (
        <StreamPost
          loading={loading}
          key={'_' + i}
          question={question}
          global={false}
        />
      );
      streamPosts.push(item);
    }

    return (
      <div className="Stream">
        <ul>{streamPosts}</ul>
      </div>
    );
  }
}
NewsFeed.propTypes = {};

export default NewsFeed;
