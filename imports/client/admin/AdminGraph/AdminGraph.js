import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Graph from '../../../collections/graph';

import ListItem from './ListItem';
import { NavLink } from 'react-router-dom';

class AdminGraph extends React.Component {
  renderGraph(graph) {
    return (
      <div>
        <ul>
          {graph.map(entry => {
            return (
              <li key={entry._id}>
                <ListItem entry={entry} collection={Graph} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="AdminGraph">
        <h2>Graph</h2>
        {this.renderGraph(this.props.graph)}
      </div>
    );
  }
}

export default withTracker(props => {
  Meteor.subscribe('graph.list');

  return {
    graph: Graph.find().fetch()
  };
})(AdminGraph);
