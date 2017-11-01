import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { exists } from '../../../helper/global';
import { isImage } from '../../../helper/asset.js';

import { Image } from '../';

class Asset extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!exists(this.props.asset)) {
      return null;
    }
    if (isImage(this.props.asset)) {
      return (
        <Image
          clickCallback={e => {
            this.props.clickCallback(e, this.props.asset);
          }}
          asset={this.props.asset}
        />
      );
    }
    return null;
  }
}
Asset.propTypes = {
  asset: PropTypes.object,
  tab: PropTypes.string,
  room: PropTypes.string,
  clickCallback: PropTypes.func
};

export default Asset;
