import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { diyMarkdown } from '../../helper/diyMarkdown';
import { localeStr, existsString, zuffi } from '../../helper/global';
import { dist, snippets } from '../../config/styles';

class StreamPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stillLoading: props.loading };
    this.timer = null;
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ stillLoading: false });
    }, zuffi(2000) + 500);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
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
        '/assets/' + question.roomId + '/questions/' + question.image;
      image = (
        <div className="StreamPostImage">
          <Img src={imgSrc} />
        </div>
      );
    }

    return (
      <Li className="StreamPost">
        <Header className="StreamPostHeader">@{question.title}</Header>
        {image}
        <Content className="StreamPostContent">{textBlocks}</Content>
      </Li>
    );
  }
}
StreamPost.propTypes = {
  question: PropTypes.object,
  loading: PropTypes.bool
};

export default StreamPost;

const Li = styled.li`
  padding: ${dist.medium} 0 0 0;
  padding-top: calc( ${dist.medium} - ${dist.lineTopDiff} - ${dist.lineBottomDiff} );
  &:last-child {
    padding-bottom: ${dist.medium};
    padding-bottom: calc( ${dist.medium} - ${dist.lineBottomDiff} );
  }
`;

const Header = styled.div`
  ${snippets.smallText};
  margin: 0 ${dist.small};
`;

const Content = styled.div`
  margin: 0 ${dist.small};
`;


const Img = styled.img`
  width: 100%;
  height: auto;
`;