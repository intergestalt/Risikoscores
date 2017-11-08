import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { dist, colors } from '../../../config/styles';

class DetailButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <A
        href="#"
        onClick={e => {
          this.props.clickCallback(e, this.props.asset);
        }}
      >
        +
      </A>
    );
  }
}
DetailButton.propTypes = {
  clickCallback: PropTypes.func,
  asset: PropTypes.object
};

export default DetailButton;

const A = styled.a`
  border: solid 1px black;
  position: absolute;
  right: ${dist.tiny};
  top: ${dist.tiny};
  width: 1em;
  height: calc(${dist.lineTopDiff} + 1em);
  width: calc(${dist.lineTopDiff} + 1em);
  line-height: calc(${dist.lineTopDiff} + 1em);
  text-align: center;
  &:hover {
    text-decoration: none;
  }
`;
