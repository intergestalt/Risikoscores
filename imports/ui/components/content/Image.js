import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getImageSrc } from '../../../helper/asset.js';
import { exists } from '../../../helper/global';

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.clickCallback = this.clickCallback.bind(this);
  }
  clickCallback(e) {
    e.preventDefault();
    console.log('Detail Click Image');
    console.log(this.props.asset);
  }

  render() {
    var imageEntitiy = null;
    console.log(this.props.asset);
    if (exists(this.props.asset)) {
      const imgSrc = getImageSrc(this.props.asset);
      imageEntitiy = <img src={imgSrc} width="300" />;
    }
    if (this.props.detailView) {
      return (
        <a
          href="#"
          onClick={e => {
            this.clickCallback(e);
          }}
        >
          {imageEntitiy}
        </a>
      );
    }
    return imageEntitiy;
  }
}
Image.propTypes = {
  asset: PropTypes.object,
  detailView: PropTypes.bool
};

export default Image;
