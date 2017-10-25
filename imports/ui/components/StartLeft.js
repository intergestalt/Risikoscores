import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Questions from '../../collections/questions';
import { Stream } from './';
import { colors } from '../../config/styles';

class StartLeft extends React.Component {
  constructor(props) {
    super(props);
  }
  renderLoading() {
    return <Container className="StartLeft">Loading...</Container>;
  }
  render() {
    if (!this.props.ready) {
      return this.renderLoading();
    }
    return (
      <Container className="StartLeft">
        <Stream rooms={this.props.rooms} questions={this.props.questions} />
      </Container>
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

const Container = styled.div`
  background-color: ${colors.lightgrey};
  overflow-y: auto;
`;
