import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import { localeStr } from '../../helper/global';
import DiyMarkdown from './DiyMarkdown';
import { snippets, dist } from '../../config/styles';

class TabContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text = localeStr(this.props.tab.text);
    return (
      <Content className="TabContent">
        <Scrollbars>
          <ScrollContainer>
            <Headline>{localeStr(this.props.tab.title)}</Headline>
            <DiyMarkdown>{text}</DiyMarkdown>
          </ScrollContainer>
        </Scrollbars>
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
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
`;

const ScrollContainer = styled.div`padding: ${dist.named.columnPadding};`;

const Headline = styled.h1`${snippets.headlineText};`;
