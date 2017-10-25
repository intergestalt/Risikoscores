import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { localeStr } from '../../helper/global';
import { getFragment } from '../../helper/fragment';
import { closeGlossarDetail } from '../../helper/actions';

class GlossarClose extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var glossarCloseText = getFragment('closeGlossar');

    return (
      <div className="GlossarClose">
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            closeGlossarDetail();
          }}
        >
          {glossarCloseText}
        </a>
      </div>
    );
  }
}

export default GlossarClose;
