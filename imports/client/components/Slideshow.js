import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Image } from './';

class Slideshow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.handleClick();
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClick() {
    const length = this.props.assets.length;
    const index = this.state.index;
    const newIndex = index < length - 1 ? index + 1 : 0;
    this.setState({ index: newIndex });
  }

  render() {
    return (
      <Image
        onClick={this.handleClick}
        asset={this.props.assets[this.state.index]}
      />
    );
  }
}

Slideshow.propTypes = {
  assets: PropTypes.array
};

export default Slideshow;
