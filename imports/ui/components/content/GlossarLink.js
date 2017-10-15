import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
          this.props.callback(e, this.props.entry);
        }}
      >
        {this.props.text} : {this.props.entry} {dummy}
      </a>
    );
  }
}
GlossarLink.propTypes = {
  text: PropTypes.string,
  entry: PropTypes.string,
  highlighted: PropTypes.bool,
  callback: PropTypes.func
};

export default GlossarLink;
