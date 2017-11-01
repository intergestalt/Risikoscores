import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import { localeStr, exists } from '../../helper/global';
import { splitOptions, getOptionFlag } from '../../helper/diyMarkdown';
<<<<<<< HEAD
import { DiyMarkdown } from './';
=======
import DiyMarkdown from './DiyMarkdown';
>>>>>>> 8b8cecff3b66d49838d24c980c34164af7d811d1
import { snippets, dist } from '../../config/styles';

class TabContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var textBoth = localeStr(this.props.tab.text);
    const splitted = splitOptions(textBoth);
    const text = splitted.text;
    const options = splitted.options;
    var scroll = !getOptionFlag(options, 'disableScrolling');

    if (scroll) {
      return (
        <Content className="TabContent">
          <Scrollbars>
            <ScrollContainer>
              {/*<Headline>{localeStr(this.props.tab.title)}</Headline>*/}
              <DiyMarkdown>{splitted.text}</DiyMarkdown>
            </ScrollContainer>
          </Scrollbars>
        </Content>
      );
    } else {
      return (
        <Content className="TabContent">
          {/*<Headline>{localeStr(this.props.tab.title)}</Headline>*/}
          <DiyMarkdown>{splitted.text}</DiyMarkdown>
        </Content>
      );
    }
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
