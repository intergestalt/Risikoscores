import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DetailButton } from './';
import { DiyMarkdown } from '../';
import { dist, snippets, colors } from '../../../config/styles';

class Annotation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text = this.props.asset.text;
    var source = this.props.asset.source;
    var detailButton = null;
    if (this.props.clickCallback) {
      detailButton = (
        <DetailButton
          clickCallback={this.props.clickCallback}
          asset={this.props.asset}
        />
      );
    }

    return (
      <Container>
        <DiyMarkdown>{text}</DiyMarkdown>
        <DiyMarkdown style={{ color: colors.darkgrey }}>{source}</DiyMarkdown>
        {detailButton}
      </Container>
    );
  }
}
Annotation.propTypes = {
  clickCallback: PropTypes.func,
  asset: PropTypes.object,
  text: PropTypes.string,
  source: PropTypes.string
};

export default Annotation;

const Container = styled.div`
  ${snippets.annotationText};
  padding-right: ${dist.named.columnPadding};
  padding-top: 1em;
  padding-bottom: 2em;
  position: relative;
  min-height: 1em;
`;
