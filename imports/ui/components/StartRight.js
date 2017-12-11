import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';
import GraphDB from '../../collections/graph';

import { StartRoomMenuArea, StartGeneralMenuArea, StartGraphArea, StartAbout } from './';
import { colors, dist } from '../../config/styles';

class StartRight extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedId: null };
  }

  render() {
    return (
      <Container className="StartRight">
        <StartGraphArea
          selectedId={this.state.selectedId}
          ready={this.props.ready}
          graph={this.props.graph}
        />
        <StartRoomMenuArea
          selectedId={this.state.selectedId}
          rooms={this.props.rooms}
          graph={this.props.graph}
        />
        <StartGeneralMenuArea />
        <StartAbout show={this.props.showAbout} />
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
    ready: sub.ready(),
    showAbout: Session.get('showAbout'),
  };
})(StartRight);

const Container = styled.div`
  background-color: ${colors.darkgrey};
  padding: ${dist.named.columnPadding};
  position: relative;
  overflow: hidden;
`;
