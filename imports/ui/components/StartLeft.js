import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import Questions from '../../collections/questions';
import { Stream } from './';

class StartLeft extends React.Component {
  constructor(props) {
    super(props);
  }
  renderLoading() {
    return <div className="StartLeft">Loading...</div>;
  }
  render() {
    if (!this.props.ready) {
      return this.renderLoading();
    }
    return (
      <div className="StartLeft">
        <Stream rooms={this.props.rooms} questions={this.props.questions} />
      </div>
    );
  }
}

StartLeft.propTypes = {
  rooms: PropTypes.array
};

export default withTracker(props => {
  const sub = Meteor.subscribe('questions.list');

  return {
    questions: Questions.find().fetch(),
    ready: sub.ready()
  };
})(StartLeft);
