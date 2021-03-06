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
        asset={this.props.asset}
      />
    );
    return (
      <div className="AnnotatedAsset">
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
  clickCallback: PropTypes.func
};

export default AnnotatedAsset;
