import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';

import GraphDB from '../../collections/graph';
import { GraphHeader, Graph, Expander, Loading } from './';
import {
  toggleGraph,
  isGraphExpanded,
  setSelectGraphNode,
  getSelectedRoomId
} from '../../helper/actions';
import { colors, dist } from '../../config/styles';
import { exists } from '../../helper/global';

class GraphArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRoomId: undefined
    };
    this.callback = this.callback.bind(this);
    this.graphCallback = this.graphCallback.bind(this);
  }

  callback(e) {
    e.preventDefault();
    toggleGraph(e);
  }

  graphCallback(roomId) {
    if (exists(roomId)) {
      setSelectGraphNode(roomId);
    } else {
      setSelectGraphNode(getSelectedRoomId());
    }
    this.setState({ selectedRoomId: roomId });
  }

  renderLoading() {
    return (
      <div className="GraphArea">
        <Loading />
      </div>
    );
  }
  render() {
    if (!this.props.ready) {
      return this.renderLoading();
    }
    //graphExpanded == true => height:33%
    //graphExpanded == false => height:7%
    var height = 7;
    if (this.props.graphExpanded) {
      height = 33.3333;
    }
    return (
      <Area className="GraphArea" relativeHeight={height}>
        <Expander
          callback={this.callback}
          expanded={isGraphExpanded()}
          directionDown={false}
        />
        <GraphHeader roomId={this.state.selectedRoomId} />
        <Graph
          width={`calc( ( 100vw / 3 ) - ( 2 * ${dist.named.columnPadding} ) )`}
          height={`calc( ( 100vh / 3 ) - ${dist.named.columnPadding} )`}
          backgroundColor={colors.mediumgrey}
          graphCallback={this.graphCallback}
          selectedId={this.props.graphNodeId}
          graph={this.props.graph}
          restrictNavigation={true}
        />
      </Area>
    );
  }
}

GraphArea.propTypes = {
  graph: PropTypes.array,
  graphNodeId: PropTypes.string,
  room: PropTypes.object
};

export default withTracker(props => {
  const sub = Meteor.subscribe('graph.list');

  return {
    graph: GraphDB.find().fetch(),
    ready: sub.ready(),
    graphExpanded: isGraphExpanded()
  };
})(GraphArea);

const Area = styled.div`
  height: ${props => props.relativeHeight}%;
  //flex:  ${props => props.relativeHeight};
  background-color: ${colors.mediumgrey};
  box-sizing:border-box;
  padding: ${dist.named.columnPadding};
  padding-top: calc( ${dist.named.columnPadding} - ${dist.lineTopDiff});  
  position: relative;
  & .Expander {
    position: absolute;
    right:0.5em;
    top:0.5em;
  }  
`;
