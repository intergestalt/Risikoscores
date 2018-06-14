import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';

import { DetailButton } from './';
import { DiyMarkdown } from '../';
import { dist, snippets, colors } from '../../../config/styles';
import { getLanguage } from '../../../helper/actions';
import { exists } from '../../../helper/global';

class Annotation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text = null;
    var source = null;
    if (exists(this.props.asset)) {
      text = this.props.asset.text;
      source = this.props.asset.source;
    } else {
      text = this.props.text;
      source = this.props.source;
    }
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
      <Container className="Annotation">
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

export default withTracker(props => {
  return {
    language: getLanguage()
  };
})(Annotation);

const Container = styled.div`
  ${snippets.annotationText};
  padding-right: ${dist.named.columnPadding};
  padding-top: 1em;
  padding-bottom: 2em;
  position: relative;
  min-height: 1em;
  *:first-child {
    margin-top: 0 !important;
  }
`;
