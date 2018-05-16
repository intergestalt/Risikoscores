import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { keyframes } from 'styled-components';

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
  setBeamOut,
  getBeamOut,
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
    this.animationDuration = 1000;
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  clickCallback(e, nodeId) {
    if (getBeamOut()) return;
    if (getSelectedRoomId() == nodeId) return;
    if (!this.props.start) {
      setPlayAudioFile('beam.mp3');
      setPlayAudio(true);
      setBeamOut(true);
    }
    setPlayAudioAll(true);
    if (!this.props.start) {
      this.timer = setTimeout(() => {
        const lang = getLanguage();
        setBeamOut(false);
        const path = '/rooms/' + nodeId + '?language=' + lang;
        this.props.history.push(path);
      }, this.animationDuration);
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
            graphCallback={this.props.beamOut ? null : this.props.graphCallback}
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
    var animIt = this.props.beamOut;

    if (this.props.start) {
      animIt = false;
    }
    const svg = (
      <SvgContainer
        className="Graph"
        style={{
          transform: transformStr,
          width: this.props.width,
          height: this.props.height
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
        <AnimWrapper
          animationIn={!this.props.beamOut}
          animationDuration={this.animationDuration}
          animation={true}
          style={{
            perspective: '1000px'
          }}
        >
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
    selectedRoomId: getSelectedRoomId(),
    beamOut: getBeamOut()
  };
})(withRouter(Graph));

const SvgContainer = styled.svg``;
const moveOut = keyframes`
                    0% {
                      transform: rotateZ(0deg) rotateY(0deg) rotateX(0deg) scale(1);
                    }
                    100% {
                      transform: rotateZ(180deg) rotateY(900deg) rotateX(400deg) scale(0);
                    }
                    `;
const moveIn = keyframes`
                    0% {
                      transform: rotateZ(180deg) rotateY(900deg) rotateX(400deg) scale(0);
                    }
                    100% {
                      transform: rotateZ(0deg) rotateY(0deg) rotateX(0deg) scale(1);
                    }
                    `;
const AnimWrapper = styled.div`
  ${props =>
    props.animation
      ? props.animationIn
        ? `animation: ${moveIn} ` + props.animationDuration + `ms ease-in-out;`
        : `animation: ${moveOut} ` + props.animationDuration + `ms ease-in-out;`
      : ''};
`;
