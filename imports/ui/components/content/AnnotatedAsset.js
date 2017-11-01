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
      <Asset
        clickCallback={this.props.clickCallback}
        asset={this.props.asset}
      />
    );
    annotation = (
      <Annotation
        clickCallback={this.props.clickCallback}
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
  clickCallback: PropTypes.func
};

export default AnnotatedAsset;
