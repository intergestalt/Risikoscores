import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DetailButton } from './';
import { DiyMarkdown } from '../';

class Annotation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text = this.props.text;
    var source = this.props.source;
    var detailButton = null;
    if (this.props.detailView) {
      detailButton = <DetailButton asset={this.props.asset} />;
    }

    return (
      <div>
        <DiyMarkdown>{text}</DiyMarkdown>
        <DiyMarkdown>{source}</DiyMarkdown>
        {detailButton}
      </div>
    );
  }
}
Annotation.propTypes = {
  detailView: PropTypes.bool,
  asset: PropTypes.object,
  text: PropTypes.string,
  source: PropTypes.string
};

export default Annotation;
