import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { showGlossarDetail } from '../../../helper/actions';

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
      <a
        className="SCGlossarLink"
        href="#"
        onClick={e => {
          e.preventDefault();
          showGlossarDetail(this.props.entry);
        }}
      >
        {this.props.text}{dummy}
      </a>
    );
  }
}
GlossarLink.propTypes = {
  text: PropTypes.string,
  entry: PropTypes.string,
  highlighted: PropTypes.bool
};

export default GlossarLink;
