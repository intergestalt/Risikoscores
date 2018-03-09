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
import { getSelectGraphNode, getSelectedRoomId } from '../../helper/actions';
import { colors } from '../../config/styles';

class Graph extends React.Component {
  constructor(props) {
    super(props);
  }

  selectNode(selectedNodeId, presentNodeId = null) {
    nodeId = presentNodeId || selectedNodeId;
    const realGraph = getTheRealGraph(this.props.graph);
    const neighbours = getNeighbours(nodeId, realGraph);
    const outgoingEdges = getOutgoingEdges(nodeId, realGraph);
    const modeMap = getGraphModes(realGraph, nodeId, neighbours, outgoingEdges);
    // patch modeMap for restricted nativation (TODO: move to getGraphModes())
    if (presentNodeId === nodeId) {
      modeMap.nodeModes[presentNodeId].neighbour = true;
      modeMap.nodeModes[presentNodeId].selected = false;
      if (modeMap.nodeModes[selectedNodeId]) {
        modeMap.nodeModes[selectedNodeId].neighbour = false;
        modeMap.nodeModes[selectedNodeId].selected = true;
      }
      for (let i in modeMap.nodeModes) {
        modeMap.nodeModes[i].passive = !modeMap.nodeModes[i].neighbour && !modeMap.nodeModes[i].selected
      }
    }
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
        var passive = nodeMode.passive;
      }
      if (!node.pseudo) {
        nodes.push(
          <GraphNode
            key={node.id}
            selected={selected}
            neighbour={neighbour}
            node={node}
            graphCallback={this.props.graphCallback}
            passive={passive}
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
      const presentNodeId = this.props.restrictNavigation ? this.props.selectedRoomId : null;
      modeMap = this.selectNode(this.props.selectedId, presentNodeId);
    }
    const lines = this.getEdges(realGraph, modeMap);
    const circles = this.getNodes(realGraph, modeMap);

    return (
      <SvgContainer className="Graph" style={{ width: this.props.width, height: this.props.height }}>
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="70%" style={{
              stopColor: 'white',
              stopOpacity: 1
            }} />
            <stop offset="80%" style={{ stopColor: this.props.backgroundColor, stopOpacity: 0 }} />
          </radialGradient>
        </defs>
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
  backgroundColor: PropTypes.string,
  restrictNavigation: PropTypes.bool,
};

export default withTracker(props => {
  return {
    selectedId: getSelectGraphNode(),
    selectedRoomId: getSelectedRoomId(),
  };
})(Graph);

const SvgContainer = styled.svg``;