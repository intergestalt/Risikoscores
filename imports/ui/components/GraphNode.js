import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { getColor } from '../../helper/graph';
import { getLanguage } from '../../helper/actions';

class GraphNode extends React.Component {
  constructor(props) {
    super(props);
    this.clickCallback = this.clickCallback.bind(this);
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
  clickCallback(e, nodeId) {
    const lang = getLanguage();
    const path = '/rooms/' + nodeId + '?language=' + lang;
    this.props.history.push(path);
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
          this.clickCallback(e, this.props.node.id);
        }}
        onMouseEnter={e => {
          this.enterCallback(e, this.props.node.id);
        }}
        onMouseLeave={e => {
          this.leaveCallback(e);
        }}
        cx={this.props.node.x + '%'}
        cy={this.props.node.y + '%'}
        r={'1ex'}
        fill={color}
      />
    );
  }
}

GraphNode.propTypes = {
  graphCallback: PropTypes.func,
  node: PropTypes.object,
  selected: PropTypes.bool,
  neighbour: PropTypes.bool
};

export default withRouter(GraphNode);
