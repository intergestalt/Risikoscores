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
    return (
      <A
        className="SCGlossarLink"
        href="#"
        highlighted={this.props.highlighted}
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
  .GlossarArea & {
    opacity: ${ props => props.highlighted ? 1 : 0.5};
  }
  .GlossarDetail & {
    opacity: 1;
  }
  .GlossarList & {
    color: white;
  }  
`

// ${ colors.named.glossar}