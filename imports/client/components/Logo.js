import React, { Component } from 'react';
import styled from 'styled-components';

class Logo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const title = "title"
    const white = (this.props.style && this.props.style == "white")
    const src = `/assets/images/${ white ? "BMBF_white.png" : "BMBF.png"}`

    return (
      <Img
        title={title}
        src={src}
        size={ white ? "large" : "small" }
      />
    );
  };
}

export default Logo;

const Img = styled.img`
  display: block;
  width: ${ props => props.size === "large" ? "6" : "5.5"}em;
  height: auto;
  pointer-events: none;
`;