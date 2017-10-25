import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';

import { GraphEdge, GraphNode } from './';
import {
  getGraphModes,
  getTheRealGraph,
  getNeighbours,
  getOutgoingEdges
} from '../../helper/graph';
import { exists } from '../../helper/global';
import { getSelectGraphNode } from '../../helper/actions';

class Graph extends React.Component {
  constructor(props) {
    super(props);
  }

  selectNode(nodeId) {
    const realGraph = getTheRealGraph(this.props.graph);
    const neighbours = getNeighbours(nodeId, realGraph);
    const outgoingEdges = getOutgoingEdges(nodeId, realGraph);
    const modeMap = getGraphModes(realGraph, nodeId, neighbours, outgoingEdges);
    return modeMap;
  }

  getEdges(realGraph, modeMap) {
    edges = [];

    for (var i = 0; i < realGraph.edges.length; i++) {
      const edge = realGraph.edges[i];
      const edgeId = edge.id;
      const n1 = edge.node1;
      const n2 = edge.node2;
      const node1 = realGraph.nodesHash[n1];
      const node2 = realGraph.nodesHash[n2];
      const edgeModes = modeMap['edgeModes'];
      var edgeMode = edgeModes[edgeId];
      var selected = false;
      if (exists(edgeMode)) {
        selected = edgeMode.selected;
      }
      edges.push(
        <GraphEdge
          key={edgeId}
          node1={node1}
          node2={node2}
          edgeId={edgeId}
          selected={selected}
        />
      );
    }
    return edges;
  }

  getNodes(realGraph, modeMap) {
    nodes = [];

    for (var i = 0; i < realGraph.nodes.length; i++) {
      const node = realGraph.nodes[i];
      const nodeId = node.id;
      const nodeModes = modeMap['nodeModes'];
      var nodeMode = nodeModes[nodeId];
      var selected = false;
      var neighbour = false;
      if (exists(nodeMode)) {
        var selected = nodeMode.selected;
        var neighbour = nodeMode.neighbour;
      }
      if (!node.pseudo) {
        nodes.push(
          <GraphNode
            key={node.id}
            selected={selected}
            neighbour={neighbour}
            node={node}
            graphCallback={this.props.graphCallback}
          />
        );
      }
    }
    return nodes;
  }

  render() {
    const realGraph = getTheRealGraph(this.props.graph);
    var modeMap = { nodeModes: {}, edgeModes: {} };

    if (exists(this.props.selectedId)) {
      modeMap = this.selectNode(this.props.selectedId);
    }
    const lines = this.getEdges(realGraph, modeMap);
    const circles = this.getNodes(realGraph, modeMap);

    return (
      <SvgContainer className="Graph" style={{ width: this.props.width, height: this.props.height }}>
        {lines}
        {circles}
      </SvgContainer>
    );
  }
}

Graph.propTypes = {
  selectedId: PropTypes.string,
  graph: PropTypes.array,
  graphCallback: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default withTracker(props => {
  return {
    selectedId: getSelectGraphNode()
  };
})(Graph);

const SvgContainer = styled.svg`
  circle {
    cursor: pointer;
  }
`;