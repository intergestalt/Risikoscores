import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getImageSrc } from '../../helper/asset.js';
import { exists } from '../../helper/global';

class Image extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var imageEntitiy = null;
    if (exists(this.props.asset)) {
      const imgSrc = getImageSrc(this.props.asset);
      imageEntitiy = <img src={imgSrc} width="300" />;
    }
    if (this.props.clickCallback) {
      return (
        <a href="#" onClick={this.props.clickCallback}>
          {imageEntitiy}
        </a>
      );
    }
    return imageEntitiy;
  }
}
Image.propTypes = {
  asset: PropTypes.object,
  clickCallback: PropTypes.func
};

export default Image;
