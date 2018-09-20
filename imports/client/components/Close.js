import React, { Component } from 'react';
import styled from 'styled-components';

import { colors, dist } from '../../config/styles';

class Close extends React.Component {

  render() {
    return (
      <Button
        style={{ ...this.props.style }}
        href="#"
        onClick={e => {
          this.props.onClick(e);
        }}
      >
        X
        </Button>
    );
  }
}

export default Close;

const Button = styled.a`
  position: absolute;
  top:${ dist.tiny};
  right:${ dist.tiny};
  border: 1px solid;
  line-height:1.1em;
  padding: 1px 0.3em 0 0.3em;
  color: ${ colors.lightgrey};
  font-family: 'Roboto Light';
  &:hover {
    text-decoration: none;
  }
`