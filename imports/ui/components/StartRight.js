import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';
import GraphDB from '../../collections/graph';

import { StartRoomMenuArea, StartGeneralMenuArea, StartGraphArea } from './';
import { colors } from '../../config/styles';

class StartRight extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedId: null };
  }

  render() {
    return (
      <Container className="StartRight">
        <StartRoomMenuArea
          selectedId={this.state.selectedId}
          rooms={this.props.rooms}
          graph={this.props.graph}
        />
        <StartGeneralMenuArea />
        <StartGraphArea
          selectedId={this.state.selectedId}
          ready={this.props.ready}
          graph={this.props.graph}
        />
      </Container>
    );
  }
}

StartRight.propTypes = {
  rooms: PropTypes.array
};

export default withTracker(props => {
  const sub = Meteor.subscribe('graph.list');

  return {
    graph: GraphDB.find().fetch(),
    ready: sub.ready()
  };
})(StartRight);

const Container = styled.div`background-color: ${colors.darkgrey};`;
