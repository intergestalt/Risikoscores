import React, { Component, Image } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getImageSrc } from '../../helper/asset.js';

class Slideshow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const imgSrc = getImageSrc(this.props.assets[0]);
    return <img src={imgSrc} />;
  }
}

Slideshow.propTypes = {
  assets: PropTypes.array
};

export default Slideshow;
