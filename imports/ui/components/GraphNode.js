import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getColor } from '../../helper/graph';

class GraphNode extends React.Component {
  constructor(props) {
    super(props);
    this.enterCallback = this.enterCallback.bind(this);
    this.leaveCallback = this.leaveCallback.bind(this);
  }
  enterCallback(e, nodeId) {
    if (this.props.graphCallback) {
      this.props.graphCallback(nodeId);
    }
  }
  leaveCallback(e) {
    if (this.props.graphCallback) {
      this.props.graphCallback();
    }
  }

  render() {
    var color = getColor('defaultColor');
    if (this.props.selected) {
      color = getColor('selectedColor');
    }
    if (this.props.neighbour) {
      color = getColor('neighbourColor');
    }
    return (
      <circle
        onClick={e => {
          this.props.passive || this.props.clickCallback(e, this.props.node.id);
        }}
        onMouseEnter={e => {
          this.props.passive || this.enterCallback(e, this.props.node.id);
        }}
        onMouseLeave={e => {
          this.leaveCallback(e);
        }}
        cx={this.props.node.x + '%'}
        cy={this.props.node.y + '%'}
        r={'1ex'}
        fill={color}
        style={{ cursor: this.props.passive ? '' : 'pointer' }}
      />
    );
  }
}

GraphNode.propTypes = {
  graphCallback: PropTypes.func,
  clickCallback: PropTypes.func,
  node: PropTypes.object,
  selected: PropTypes.bool,
  neighbour: PropTypes.bool,
  passive: PropTypes.bool
};

export default GraphNode;
