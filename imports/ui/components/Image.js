import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getImageSrc } from '../../helper/asset.js';
import { exists } from '../../helper/global';

class Image extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var imageEntity = null;
    if (exists(this.props.asset)) {
      const imgSrc = getImageSrc(this.props.asset);
      imageEntity = <Img src={imgSrc} />;
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
`;

const A = styled.a`
width: 100%;
`;