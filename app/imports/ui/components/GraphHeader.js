import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFragment } from '../../helper/fragment';

class GraphHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var title = getFragment('graphTitle');

    return (
      <div className="GraphHeader">
        <h1>{title}</h1>
      </div>
    );
  }
}

export default GraphHeader;
