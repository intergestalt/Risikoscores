import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { localeStr, exists } from '../../helper/global';
import { splitOptions, getOptionFlag } from '../../helper/diyMarkdown';
import { DiyMarkdown, CustomScrollbars } from './';
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
          <CustomScrollbars>
            <ScrollContainer>
              {/*<Headline>{localeStr(this.props.tab.title)}</Headline>*/}
              <DiyMarkdown>{splitted.text}</DiyMarkdown>
            </ScrollContainer>
          </CustomScrollbars>
        </Content>
      );
    } else {
      return (
        <ContentNoScroll className="TabContent">
          {/*<Headline>{localeStr(this.props.tab.title)}</Headline>*/}
          <DiyMarkdown>{splitted.text}</DiyMarkdown>
        </ContentNoScroll>
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
  //overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  position:relative; // see https://stackoverflow.com/questions/15381172/how-to-make-flexbox-children-100-height-of-their-parent
  & > * {
    position: absolute !important; // see above
  }
`;

const ContentNoScroll = Content.extend`
  overflow-y:hidden;
  & > * {
    position: initial !important;
    //position: absolute !important; // see above
  }  
  & > *,
  & > * > * {
    height: 100%;
  }
  &, & * {
    background-color: inherit; // helps hiding the horizontal scrollbar in Timeline
  }
`;

const ScrollContainer = styled.div``;

const Headline = styled.h1`${snippets.headlineText};`;
