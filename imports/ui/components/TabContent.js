import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { localeStr } from '../../helper/global';
import { diyMarkdown } from '../../helper/diyMarkdown';
import { snippets, dist } from '../../config/styles';

class TabContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text = localeStr(this.props.tab.text);
    const textBlocks = diyMarkdown(text, false);
    return (
      <Content className="TabContent">
        <Headline>{localeStr(this.props.tab.title)}</Headline>
        {textBlocks}
      </Content>
    );
  }
}

TabContent.propTypes = {
  roomFolder: PropTypes.string,
  tab: PropTypes.object
};

export default TabContent;

const Content = styled.div`
padding: ${dist.named.columnPadding};
`;

const Headline = styled.h1`
  ${snippets.headlineText};
`;
