import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';

import { localeStr, zuffi, exists } from '../../helper/global';
import { getLanguage } from '../../helper/actions';
import { dist, snippets } from '../../config/styles';
import { DiyMarkdown, Image, StreamLoading } from './';

class StreamPost extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillUnmount() {}

  renderLoading() {
    return (
      <LiLoading className="StreamPost">
        <StreamLoading />
      </LiLoading>
    );
  }

  render() {
    if (this.props.loading) {
      return this.renderLoading();
    }
    const question = this.props.question;
    var text = null;
    var title = null;
    if (this.props.global) {
      title = localeStr(question.title, this.props.lang);
      text = localeStr(question.text, this.props.lang);
    } else {
      title = question.title;
      text = question.text;
    }

    return (
      <Li className="StreamPost">
        <Header className="StreamPostHeader">@{title}</Header>
        <Content className="StreamPostContent">
          <DiyMarkdown>{text}</DiyMarkdown>
        </Content>
      </Li>
    );
  }
}
StreamPost.propTypes = {
  question: PropTypes.object,
  loading: PropTypes.bool,
  global: PropTypes.bool
};
export default withTracker(props => {
  var global;
  if (!exists(props.global)) {
    global = true;
  } else {
    global = props.global;
  }
  return {
    lang: getLanguage(),
    global: global,
    question: props.question
  };
})(StreamPost);

const Li = styled.li`
  padding: ${dist.medium} 0 0 0;
  padding-top: calc(
    ${dist.medium} - (${dist.lineTopDiff} + ${dist.lineBottomDiff})
  );
  &:last-child {
    padding-bottom: ${dist.medium};
    padding-bottom: calc(${dist.medium} - ${dist.lineBottomDiff});
  }
`;

const LiLoading = Li.extend`
  padding: ${dist.small} 0 0 ${dist.small};
`;

const Header = styled.div`
  ${snippets.smallText};
  margin: 0 ${dist.small};
`;

const Content = styled.div`
  margin: 0;
  & p {
    margin-top: 0 !important;
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;
