import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import GraphDB from '../../collections/graph';
import { GraphHeader, Graph, Expander } from './';
import { toggleGraph, isGraphExpanded } from '../../helper/actions';

class GraphArea extends React.Component {
  constructor(props) {
    super(props);
    this.callback = this.callback.bind(this);
  }

  callback(e) {
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
      <div className="GraphArea">
        <h1>Graph: {height}%</h1>
        <Expander
          callback={this.callback}
          expanded={isGraphExpanded()}
          directionDown={false}
        />
        <GraphHeader />
        <Graph graph={this.props.graph} />
      </div>
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
