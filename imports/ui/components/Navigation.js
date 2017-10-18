import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import Questions from '../../collections/questions';
import Graph from '../../collections/graph';
import { RoomQuestions, GraphArea } from './';
import { isGlossarExpanded } from '../../helper/actions';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }
  renderLoading() {
    return <div className="Navigation">Loading...</div>;
  }
  render() {
    if (!this.props.ready) {
      return this.renderLoading();
    }

    var graph = null;
    if (this.props.navigationExpanded) {
      graph = <GraphArea />;
    }
    return (
      <div className="Navigation">
        {graph}
        <RoomQuestions
          questions={this.props.questions}
          navigationExpanded={this.props.navigationExpanded}
        />
      </div>
    );
  }
}

Navigation.propTypes = {
  room: PropTypes.object
};

export default withTracker(props => {
  const sub = Meteor.subscribe('questions.list');
  const sub2 = Meteor.subscribe('graph.list');

  return {
    questions: Questions.find().fetch(),
    graph: Graph.find().fetch(),
    ready: sub.ready() && sub2.ready(),
    navigationExpanded: !isGlossarExpanded()
  };
})(Navigation);
