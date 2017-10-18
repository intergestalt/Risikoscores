import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GraphHeader, Graph } from './';

class GraphArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="GraphArea">
        <GraphHeader />
        <Graph graph={this.props.graph} />
      </div>
    );
  }
}

GraphArea.propTypes = {
  graph: PropTypes.object
};

export default GraphArea;
