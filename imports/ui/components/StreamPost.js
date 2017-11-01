import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

import { localeStr, existsString, zuffi } from '../../helper/global';
import { getLanguage } from '../../helper/actions';
import { dist, snippets } from '../../config/styles';
import { DiyMarkdown, Image, StreamLoading } from './';

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
    return (
      <LiLoading className="StreamPost">
        <StreamLoading />
      </LiLoading>
    );
  }

  render() {
    if (this.state.stillLoading) {
      return this.renderLoading();
    }

    const question = this.props.question;
    var text = localeStr(question.text, this.props.lang);
    var title = localeStr(question.title, this.props.lang);
    var image = null;
    if (existsString(question.image)) {
      const asset = {
        name: question.image,
        tab: 'questions',
        room: question.roomId
      };
      image = (
        <div className="StreamPostImage">
          <Image asset={asset} />
        </div>
      );
    }

    return (
      <Li className="StreamPost">
        <Header className="StreamPostHeader">@{title}</Header>
        {image}
        <Content className="StreamPostContent">
          <DiyMarkdown>{text}</DiyMarkdown>
        </Content>
      </Li>
    );
  }
}
StreamPost.propTypes = {
  question: PropTypes.object,
  loading: PropTypes.bool
};
export default withTracker(props => {
  return {
    lang: getLanguage()
  };
})(StreamPost);

const Li = styled.li`
  padding: ${dist.medium} 0 0 0;
  padding-top: calc(
    ${dist.medium} - ( ${dist.lineTopDiff} + ${dist.lineBottomDiff} )
  );
  &:last-child {
    padding-bottom: ${dist.medium};
    padding-bottom: calc(${dist.medium} - ${dist.lineBottomDiff});
  }
`;

const LiLoading = Li.extend`padding: ${dist.medium};`;

const Header = styled.div`
  ${snippets.smallText};
  margin: 0 ${dist.small};
`;

const Content = styled.div`margin: 0 ${dist.small};`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;
