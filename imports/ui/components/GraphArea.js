import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';

import GraphDB from '../../collections/graph';
import { GraphHeader, Graph, Expander } from './';
import { toggleGraph, isGraphExpanded } from '../../helper/actions';
import { colors } from '../../config/styles';

class GraphArea extends React.Component {
  constructor(props) {
    super(props);
    this.callback = this.callback.bind(this);
  }

  callback(e) {
    e.preventDefault();
    toggleGraph(e);
  }
  renderLoading() {
    return <div className="GraphArea">Loading...</div>;
  }
  render() {
    if (!this.props.ready) {
      return this.renderLoading();
    }
    //graphExpanded == true => height:33%
    //graphExpanded == false => height:7%
    var height = 7;
    if (this.props.graphExpanded) {
      height = 33;
    }
    return (
      <Area className="GraphArea" relativeHeight={height}>
        <h1>Graph: {height}%</h1>
        <Expander
          callback={this.callback}
          expanded={isGraphExpanded()}
          directionDown={false}
        />
        <GraphHeader />
        <Graph graph={this.props.graph} />
      </Area>
    );
  }
}

GraphArea.propTypes = {
  graph: PropTypes.array
};

export default withTracker(props => {
  const sub = Meteor.subscribe('graph.list');

  return {
    graph: GraphDB.find().fetch(),
    ready: sub.ready(),
    graphExpanded: isGraphExpanded()
  };
})(GraphArea);

const Area = styled.div.attrs({
  relativeHeight: props => props.relativeHeight || '33.33'
}) `
  height: ${props => props.relativeHeight}%;
  //flex:  ${props => props.relativeHeight};
  background-color: ${colors.mediumgrey};
`;