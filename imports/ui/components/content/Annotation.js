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
    var text = this.props.text;
    var source = this.props.source;
    var detailButton = null;
    if (this.props.clickCallback) {
      detailButton = <DetailButton asset={this.props.asset} />;
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
  padding: ${ dist.named.columnPadding};
  padding-top: calc( ${ dist.tiny} - ${dist.lineTopDiff});
  padding-bottom: calc( ${ dist.smll} - ${dist.lineBottomDiff});
  position: relative;
`;