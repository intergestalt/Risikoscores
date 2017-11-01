import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Asset, Annotation } from './';

class AnnotatedAsset extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var asset = null;
    var annotation = null;
    asset = (
      <Asset detailView={this.props.detailView} asset={this.props.asset} />
    );
    annotation = (
      <Annotation
        detailView={this.props.detailView}
        text={this.props.text}
        source={this.props.source}
      />
    );
    return (
      <div>
        {asset}
        {annotation}
      </div>
    );
  }
}
AnnotatedAsset.propTypes = {
  asset: PropTypes.object,
  tab: PropTypes.string,
  room: PropTypes.string,
  text: PropTypes.string,
  source: PropTypes.string,
  detailView: PropTypes.bool
};

export default AnnotatedAsset;
