import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { localeStr } from '../../helper/global';
import { getFragment } from '../../helper/fragment';

class GlossarClose extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var glossarCloseText = getFragment('closeGlossar');

    return (
      <div className="GlossarClose">
        <a href="#" onClick={this.props.closeGlossarDetail}>
          {glossarCloseText}
        </a>
      </div>
    );
  }
}

GlossarClose.propTypes = {
  closeGlossarDetail: PropTypes.func
};

export default GlossarClose;
