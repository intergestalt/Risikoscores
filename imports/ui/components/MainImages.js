import React, { Component, Image } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Slideshow } from './';
import { exists } from '../../helper/global';

class MainImages extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var slideShow = null;
    if (exists(this.props.images)) {
      var assets = [];
      for (var i = 0; i < this.props.images.length; i++) {
        const a = {
          type: 'image',
          room: this.props.roomFolder,
          name: this.props.images[i].name
        };
        assets.push(a);
      }
      slideShow = <Slideshow assets={assets} />;
    }
    return <ImageContainer className="MainImages">{slideShow}</ImageContainer>;
  }
}

MainImages.propTypes = {
  roomFolder: PropTypes.string,
  images: PropTypes.array
};

export default MainImages;

const ImageContainer = styled.div`
  img {
    width: 100%;
    height: 33.33vh;
    object-fit: cover;
  }
`;
