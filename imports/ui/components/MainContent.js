import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { localeStr } from '../../helper/global';
import { splitOptions, getOption } from '../../helper/diyMarkdown';
import { snippets, dist, colors } from '../../config/styles';
import DiyMarkdown from './DiyMarkdown';

class MainContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var textBoth = localeStr(this.props.room.mainText);
    const splitted = splitOptions(textBoth);
    const text = splitted.text;
    const options = splitted.options;
    const backgroundImage = getOption(options, 'backgroundImage');
    if (backgroundImage) {
      console.log('Backgroundimage ' + backgroundImage);
    }
    const title = localeStr(this.props.room.name);
    return (
      <Content className="MainContent">
        <Headline>{title}</Headline>
        <DiyMarkdown>{text}</DiyMarkdown>
      </Content>
    );
  }
}

MainContent.propTypes = {
  room: PropTypes.object
};

export default MainContent;

const Content = styled.div`
  padding: ${dist.named.columnPadding};
  padding-top: calc(${dist.named.columnPadding} - ${dist.lineTopDiff});
`;

const Headline = styled.h1`
  ${snippets.headlineText};
  color: ${colors.named.room};
  margin-bottom: 1em;
`;
