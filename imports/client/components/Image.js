import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import styled from 'styled-components';

import { getImageSrc } from '../../helper/asset.js';
import { getLanguage } from '../../helper/actions';
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
      const title =
        this.props.asset.title && getLanguage()
          ? this.props.asset.title[getLanguage()]
          : '';
      const imgSrc = getImageSrc(this.props.asset, this.props.roomVariant);
      var srcSet = null;
      if (!imgSrc.endsWith('svg')) {
        srcSet = getSrcsetString(imgSrc, sizeName);
      }
      imageEntity = (
        <Img
          key={imgSrc}
          innerRef={this.props.imgRef}
          onLoad={this.props.onLoad}
          src={imgSrc}
          srcSet={srcSet}
          title={title}
          alt={title}
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
  imgStyles: PropTypes.string,
  imgRef: PropTypes.func,
  onLoad: PropTypes.func
};

export default withTracker(props => {
  return {
    roomVariant: Session.get('roomVariant')
  };
})(Image);

const Img = styled.img`
  width: 100%;
  display: block;
  ${props => props.imgStyles};
`;

const A = styled.a`
  width: 100%;
  display: block;
`;
