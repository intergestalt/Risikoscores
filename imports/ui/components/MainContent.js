import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from 'color';

import { setPopupActive, incPopupsIndex } from '../../helper/actions';
import { localeStr } from '../../helper/global';
import { splitOptions, getOption } from '../../helper/diyMarkdown';
import { getImageAsset } from '../../helper/asset';
import { snippets, dist, colors } from '../../config/styles';
import { DiyMarkdown, CustomScrollbars } from './';

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.clickCallback = this.clickCallback.bind(this);
  }
  clickCallback(e, roomId, tabId) {
    e.preventDefault();
    setPopupActive(true);
    incPopupsIndex();
  }
  render() {
    var textBoth = localeStr(this.props.room.mainText);
    const splitted = splitOptions(textBoth);
    const text = splitted.text;
    const options = splitted.options;
    const backgroundImage = getOption(options, 'backgroundImage');
    var imageAsset = null;
    if (backgroundImage) {
      console.log('Backgroundimage ' + backgroundImage);
      imageAsset = getImageAsset(backgroundImage, this.props.room._id);
      console.log(imageAsset);
    }
    const title = localeStr(this.props.room.name);
    return (
      <Container>
        <a
          href={'#'}
          onClick={e => {
            this.clickCallback(e);
          }}
        >
          Störer
        </a>
        <CustomScrollbars autoHide shadeColor={colors.lightgrey}>
          <Content className="MainContent">
            <Headline>{title}</Headline>
            <DiyMarkdown>{text}</DiyMarkdown>
          </Content>
        </CustomScrollbars>
      </Container>
    );
  }
}

MainContent.propTypes = {
  room: PropTypes.object
};

export default MainContent;

const Container = styled.div`
  height: 66.66%;
  position: relative;
`;

const Content = styled.div`
  padding-top: calc(${dist.named.columnPadding} - ${dist.lineTopDiff});
  padding-bottom: calc(1em + ${dist.lineBottomDiff});
`;

const Headline = styled.h1`
  ${snippets.headlineText};
  color: ${colors.named.room};
  padding: 0 ${dist.named.columnPadding} 0;
`;
