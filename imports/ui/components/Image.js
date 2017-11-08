import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getImageSrc } from '../../helper/asset.js';
import { exists } from '../../helper/global';
import { getSrcsetString } from '../../helper/uploads';

class Image extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const sizeName = this.props.size || false;
    var imageEntity = null;
    if (exists(this.props.asset)) {
      const imgSrc = getImageSrc(this.props.asset);
      const title = this.props.asset.title;
      imageEntity = <Img src={imgSrc} srcSet={getSrcsetString(imgSrc, sizeName)} title={title} />;
    }
    if (this.props.clickCallback) {
      return (
        <A href="#" onClick={this.props.clickCallback}>
          {imageEntity}
        </A>
      );
    }
    return imageEntity;
  }
}
Image.propTypes = {
  asset: PropTypes.object,
  clickCallback: PropTypes.func
};

export default Image;

const Img = styled.img`
  width: 100%;
  display: block;
`;

const A = styled.a`width: 100%;`;
