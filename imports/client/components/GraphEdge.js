import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getColor } from '../../helper/graph';

class GraphEdge extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.node1 || !this.props.node2) return null

    var color = getColor('defaultEdgeColor');
    if (this.props.selected) {
      color = getColor('selectedEdgeColor');
    }

    return (
      <line
        x1={this.props.node1.x + '%'}
        y1={this.props.node1.y + '%'}
        x2={this.props.node2.x + '%'}
        y2={this.props.node2.y + '%'}
        stroke={color}
        strokeWidth={2}
      />
    );
  }
}

GraphEdge.propTypes = {
  node1: PropTypes.object,
  node2: PropTypes.object,
  selected: PropTypes.bool
};

export default GraphEdge;
