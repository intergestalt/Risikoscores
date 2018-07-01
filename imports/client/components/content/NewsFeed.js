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
    this.state = { feedIndex: 1 };
    this.timeout = null;
  }
  componentDidMount() {
    this.timeOut();
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
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
      this.incFeedIndex();
      this.timeOut();
    }, 5000);
  }
  incFeedIndex() {
    var i = this.state.feedIndex;
    i++;
    if (i > this.questions.length - 1) {
      i = question.length - 1;
    }
    this.setState({ feedIndex: i });
  }
  setLoading(index, yes) {
    this.questions[index].loading = yes;
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
    for (var i = myQuestions.length - 1; i >= 0; i--) {
      const question = myQuestions[i];

      const item = (
        <StreamPost
          loading={question.loading}
          key={'_' + i}
          question={question}
          global={false}
        />
      );
      streamPosts.push(item);
      this.setLoading(i, false);
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
