import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { toggleGlossar } from '../../helper/actions';

class GlossarExpander extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text = 'arrow down';
    if (this.props.glossarExpanded) {
      text = 'arrow up';
    }
    return (
      <div className="GlossarExpander">
        <a
          href="#"
          onClick={e => {
            toggleGlossar(e);
          }}
        >
          {text}
        </a>
      </div>
    );
  }
}

GlossarExpander.propTypes = {
  glossarExpanded: PropTypes.bool
};

export default GlossarExpander;
