import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
  getGraphColors,
  getTheRealGraph,
  getNeighbours,
  getColor,
  getOutgoingEdges
} from '../../helper/graph';
import { exists } from '../../helper/global';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.clickCallback = this.clickCallback.bind(this);
    this.enterCallback = this.enterCallback.bind(this);
    this.leaveCallback = this.leaveCallback.bind(this);
    this.state = { nodeColors: {}, edgeColors: {} };
  }

  clickCallback(e, nodeId) {
    const path = '/rooms/' + nodeId;
    this.props.history.push(path);
  }

  enterCallback(e, nodeId) {
    const realGraph = getTheRealGraph(this.props.graph);
    const neighbours = getNeighbours(nodeId, realGraph);
    const outgoingEdges = getOutgoingEdges(nodeId, realGraph);
    colorMap = getGraphColors(realGraph, nodeId, neighbours, outgoingEdges);
    this.setState({
      nodeColors: colorMap.nodeColors,
      edgeColors: colorMap.edgeColors
    });
    if (this.props.graphCallback) {
      this.props.graphCallback(nodeId, neighbours);
    }
  }
  leaveCallback(e) {
    const realGraph = getTheRealGraph(this.props.graph);
    colorMap = getGraphColors(realGraph);
    this.setState({
      nodeColors: colorMap.nodeColors,
      edgeColors: colorMap.edgeColors
    });
    if (this.props.graphCallback) {
      this.props.graphCallback();
    }
  }
  getEdges(realGraph) {
    edges = [];

    for (var i = 0; i < realGraph.edges.length; i++) {
      const edge = realGraph.edges[i];
      const edgeId = edge.id;
      const n1 = edge.node1;
      const n2 = edge.node2;
      const node1 = realGraph.nodesHash[n1];
      const node2 = realGraph.nodesHash[n2];
      const edgeColors = this.state['edgeColors'];
      var edgeColor = edgeColors[edgeId];
      if (!exists(edgeColor)) {
        edgeColor = getColor('defaultEdgeColor');
      }
      const l = (
        <line
          key={edgeId}
          x1={node1.x + '%'}
          y1={node1.y + '%'}
          x2={node2.x + '%'}
          y2={node2.y + '%'}
          stroke={edgeColor}
          strokeWidth={1}
        />
      );
      edges.push(l);
    }
    return edges;
  }

  getNodes(realGraph) {
    nodes = [];

    for (var i = 0; i < realGraph.nodes.length; i++) {
      const node = realGraph.nodes[i];
      const nodeId = node.id;
      const nodeColors = this.state['nodeColors'];
      var nodeColor = nodeColors[nodeId];
      if (!exists(nodeColor)) {
        nodeColor = getColor('defaultColor');
      }
      if (!node.pseudo) {
        const c = (
          <circle
            key={nodeId}
            onClick={e => {
              this.clickCallback(e, node.id);
            }}
            onMouseEnter={e => {
              this.enterCallback(e, node.id);
            }}
            onMouseLeave={e => {
              this.leaveCallback(e, node.id);
            }}
            cx={node.x + '%'}
            cy={node.y + '%'}
            r={'3%'}
            fill={nodeColor}
          />
        );
        nodes.push(c);
      }
    }
    return nodes;
  }

  render() {
    const realGraph = getTheRealGraph(this.props.graph);
    const lines = this.getEdges(realGraph);
    const circles = this.getNodes(realGraph);

    return (
      <div className="Graph">
        <svg style={{ width: this.props.width, height: this.props.height }}>
          {lines}
          {circles}
        </svg>
      </div>
    );
  }
}

Graph.propTypes = {
  graph: PropTypes.array,
  graphCallback: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string
};

export default withRouter(Graph);
