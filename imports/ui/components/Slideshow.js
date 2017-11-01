import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Image } from './';

class Slideshow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Image asset={this.props.assets[0]} />;
  }
}

Slideshow.propTypes = {
  assets: PropTypes.array
};

export default Slideshow;
