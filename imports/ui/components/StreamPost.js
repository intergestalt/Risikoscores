import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { diyMarkdown } from '../../helper/diyMarkdown';
import { localeStr, existsString, zuffi } from '../../helper/global';

class StreamPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stillLoading: props.loading };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ stillLoading: false });
    }, zuffi(2000) + 500);
  }
  renderLoading() {
    return <li className="StreamPost">loading...</li>;
  }

  render() {
    if (this.state.stillLoading) {
      return this.renderLoading();
    }

    const question = this.props.question;
    var text = localeStr(question.text);
    const textBlocks = diyMarkdown(text, false, false);
    var image = null;
    if (existsString(question.image)) {
      const imgSrc =
        '../../assets/' + question.roomId + '/questions/' + question.image;
      image = (
        <div className="StreamPostImage">
          <img src={imgSrc} width="300" />
        </div>
      );
    }

    return (
      <li className="StreamPost">
        <div className="StreamPostHeader">@{question.title}</div>
        {image}
        <div className="StreamPostContent">{textBlocks}</div>
      </li>
    );
  }
}
StreamPost.propTypes = {
  question: PropTypes.object,
  loading: PropTypes.bool
};

export default StreamPost;
