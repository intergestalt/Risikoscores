import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import GraphDB from '../../collections/graph';
import { Graph } from './';

class StartGraphArea extends React.Component {
  constructor(props) {
    super(props);
  }
  renderLoading() {
    return <div className="StartGraphArea">Loading...</div>;
  }
  render() {
    if (!this.props.ready) {
      return this.renderLoading();
    }
    return (
      <div className="StartGraphArea">
        <Graph graph={this.props.graph} />
      </div>
    );
  }
}

StartGraphArea.propTypes = {
  graph: PropTypes.array
};

export default withTracker(props => {
  const sub = Meteor.subscribe('graph.list');

  return {
    graph: GraphDB.find().fetch(),
    ready: sub.ready()
  };
})(StartGraphArea);
