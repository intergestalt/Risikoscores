import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { showGlossarDetail } from '../../../helper/actions';
import { colors } from '../../../config/styles';

class GlossarLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var dummy = '';
    if (this.props.highlighted) {
      dummy = ': Is in Room';
    }
    return (
      <A
        className="SCGlossarLink"
        href="#"
        onClick={e => {
          e.preventDefault();
          showGlossarDetail(this.props.entry);
        }}
      >
        {this.props.text}{dummy}
      </A>
    );
  }
}
GlossarLink.propTypes = {
  text: PropTypes.string,
  entry: PropTypes.string,
  highlighted: PropTypes.bool
};

export default GlossarLink;

const A = styled.a`
  color: ${colors.named.glossar};
  .GlossarContent & {
    color: white;
  }  
`

// ${ colors.named.glossar}