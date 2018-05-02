import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { GraphEdge, GraphNode } from './';
import {
  getGraphModes,
  getTheRealGraph,
  getNeighbours,
  getOutgoingEdges
} from '../../helper/graph';
import { exists } from '../../helper/global';
import {
  getSelectGraphNode,
  getSelectedRoomId,
  getLanguage,
  setPlayAudio,
  setPlayAudioFile,
  setPlayAudioAll
} from '../../helper/actions';
import { colors } from '../../config/styles';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.clickCallback = this.clickCallback.bind(this);
    this.timer = null;
    this.state = {
      beam: false
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  clickCallback(e, nodeId) {
    if (this.state.beam) return;
    if (getSelectedRoomId() == nodeId) return;
    if (!this.props.start) {
      this.setState({ beam: true });
    }
    setPlayAudioAll(true);
    if (!this.props.start) {
      this.timer = setTimeout(() => {
        const lang = getLanguage();
        const path = '/rooms/' + nodeId + '?language=' + lang;
        this.props.history.push(path);
      }, 2000);
    } else {
      const lang = getLanguage();
      const path = '/rooms/' + nodeId + '?language=' + lang;
      this.props.history.push(path);
    }
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
        modeMap.nodeModes[i].passive =
          !modeMap.nodeModes[i].neighbour && !modeMap.nodeModes[i].selected;
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
      var passive = null;
      if (exists(nodeMode)) {
        selected = nodeMode.selected;
        neighbour = nodeMode.neighbour;
        passive = nodeMode.passive;
      }
      if (!node.pseudo) {
        nodes.push(
          <GraphNode
            key={node.id}
            selected={selected}
            neighbour={neighbour}
            node={node}
            graphCallback={this.state.beam ? null : this.props.graphCallback}
            clickCallback={this.clickCallback}
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
      const presentNodeId = this.props.restrictNavigation
        ? this.props.selectedRoomId
        : null;
      modeMap = this.selectNode(this.props.selectedId, presentNodeId);
    }
    const lines = this.getEdges(realGraph, modeMap);
    const circles = this.getNodes(realGraph, modeMap);
    var angelX = this.props.angelX;
    if (!exists(angelX)) angelX = 0;
    var angelY = this.props.angelY;
    if (!exists(angelY)) angelY = 0;
    var transformStr = 'rotateX(' + angelX + 'deg) rotateY(' + angelY + 'deg)';

    var animIt = this.state.beam;
    var animationDuration = 0;
    if (this.state.beam) {
      animationDuration = 2000;
    }
    if (this.props.start) {
      animIt = false;
    }

    const svg = (
      <SvgContainer
        className="Graph"
        style={{
          width: this.props.width,
          height: this.props.height,
          transform: 'rotateX(' + angelX + 'deg) rotateY(' + angelY + 'deg)'
        }}
      >
        <defs>
          <radialGradient
            id="grad1"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop
              offset="70%"
              style={{
                stopColor: 'white',
                stopOpacity: 1
              }}
            />
            <stop
              offset="80%"
              style={{
                stopColor: this.props.backgroundColor,
                stopOpacity: 0
              }}
            />
          </radialGradient>
        </defs>
        {lines}
        {circles}
      </SvgContainer>
    );
    if (this.props.start) {
      return svg;
    } else {
      return (
        <AnimWrapper animationDuration={animationDuration} animation={animIt}>
          {svg}
        </AnimWrapper>
      );
    }
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
  animation: PropTypes.bool
};

export default withTracker(props => {
  return {
    selectedId: getSelectGraphNode(),
    selectedRoomId: getSelectedRoomId()
  };
})(withRouter(Graph));

const SvgContainer = styled.svg``;

const AnimWrapper = styled.div`
  ${props =>
    props.animation
      ? 'transform: rotateY(1800deg) rotateX(500deg) scale(0);' +
        'transition: transform ' +
        props.animationDuration +
        'ms ease-in-out;'
      : ''};
`;
