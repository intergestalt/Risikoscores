import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { updateTabSliderAssets } from '../../helper/asset';
import { localeStr, exists } from '../../helper/global';
import { splitOptions, getOptionFlag } from '../../helper/diyMarkdown';
import { DiyMarkdown, CustomScrollbars } from './';
import { snippets, dist } from '../../config/styles';

class TabContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ hidden: false })
    }, 100)
  }

  componentWillReceiveProps() {
    this.setState({ hidden: true })
    setTimeout(() => {
      this.setState({ hidden: false })
    }, 100)
  }

  render() {
    var textBoth = localeStr(this.props.tab.text);
    const splitted = splitOptions(textBoth);
    const text = splitted.text;
    updateTabSliderAssets(text, this.props.roomId, this.props.tab.identifier);

    const options = splitted.options;
    var scroll = !getOptionFlag(options, 'disableScrolling');

    const tabClass = "TabContent " + (this.state.hidden ? "hidden" : "")

    if (scroll) {
      return (
        <Content className={tabClass}>
          <CustomScrollbars>
            <ScrollContainer className="ScrollContainer">
              {/*<Headline>{localeStr(this.props.tab.title)}</Headline>*/}
              <DiyMarkdown>{splitted.text}</DiyMarkdown>
            </ScrollContainer>
          </CustomScrollbars>
        </Content>
      );
    } else {
      return (
        <ContentNoScroll className={tabClass}>
          {/*<Headline>{localeStr(this.props.tab.title)}</Headline>*/}
          <DiyMarkdown>{splitted.text}</DiyMarkdown>
        </ContentNoScroll>
      );
    }
  }
}

TabContent.propTypes = {
  roomId: PropTypes.string,
  tab: PropTypes.object
};

export default TabContent;

const Content = styled.div`
  &:not(.hidden) {
    transition: opacity 0.6s;
  }
  opacity: 1;
  &.hidden {
    opacity: 0;
  }
  //overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  position: relative; // see https://stackoverflow.com/questions/15381172/how-to-make-flexbox-children-100-height-of-their-parent
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

const ScrollContainer = styled.div`
  padding-bottom: 10em; // TODO insert height of MENU button
`;

const Headline = styled.h1`${snippets.headlineText};`;
