import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from 'color';

import { localeStr } from '../../helper/global';
import { GlossarClose, DiyMarkdown, CustomScrollbars } from './';
import { colors, snippets } from '../../config/styles';

class GlossarDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.entry.name != prevProps.entry.name) {
      this.scrollbars.scrollTop()
    }
  }

  render() {
    var text = localeStr(this.props.entry.text);
    var title = localeStr(this.props.entry.name);
    return (
      <Container className="GlossarContent GlossarDetail" relativeHeight={this.props.relativeHeight}>
        <CustomScrollbars autoHide scrollbarsRef={el => (this.scrollbars = el)} shadeColor={color(colors.darkgrey).darken(0.05).string()}>
          <InnerContainer>
            <Header>{title}</Header>
            <GlossarClose />
            <DiyMarkdown>{text}</DiyMarkdown>
          </InnerContainer>
        </CustomScrollbars>
      </Container>
    );
  }
}

GlossarDetail.propTypes = {
  entry: PropTypes.object
};

export default GlossarDetail;

const Container = styled.div`
  color: white;
  position: fixed;
  top:0;
  right:0;
  height: ${props => props.relativeHeight}%;
  width: 33.333vw;
  transition: height 0.3s;
  box-sizing: border-box;
  background: inherit;
  background-color: ${colors.darkgrey};
  overflow: auto;
  z-index: 5;
  .DiyMarkdown p {
    padding-left: 0;
    padding-right: 0;
  }
`;

const InnerContainer = styled.div`
  ${ snippets.standardTextPaddings};
`;

const Header = styled.h3`
  ${ snippets.headlineText}
`