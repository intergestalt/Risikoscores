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
      const title = this.props.asset.title;
      const imgSrc = getImageSrc(this.props.asset);
      imageEntity = (
        <Img
          src={imgSrc}
          srcSet={getSrcsetString(imgSrc, sizeName)}
          title={title}
          imgStyles={this.props.imgStyles}
          onClick={this.props.onClick}
        />
      );
    }
    if (this.props.clickCallback) {
      return (
        <A
          href="#"
          onClick={e => {
            this.props.clickCallback(e, this.props.asset);
          }}
        >
          {imageEntity}
        </A>
      );
    }
    return imageEntity;
  }
}
Image.propTypes = {
  asset: PropTypes.object,
  clickCallback: PropTypes.func,
  imgStyles: PropTypes.string
};

export default Image;

const Img = styled.img`
  width: 100%;
  display: block;
  ${ props => props.imgStyles};
`;

const A = styled.a`
  width: 100%;
  display: block;
`;
