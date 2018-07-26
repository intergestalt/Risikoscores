import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import Rooms from '../../collections/rooms';
import styled from 'styled-components';
import { getFragment } from '../../helper/fragment';
import { snippets } from '../../config/styles';

class GraphHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var title = this.props.title || getFragment('graphTitle');
    return (
      <Container className="GraphHeader">
        <Header>{title}</Header>
      </Container>
    );
  }
}

export default withTracker(props => {
  const sub2 = Meteor.subscribe('room');
  const language = Session.get('language');
  const room = Rooms.findOne({ key: props.roomId });
  const title = room && language ? room.name[language] : null;

  return {
    title
  };
})(GraphHeader);

const Container = styled.div`
  position: absolute;
`;

const Header = styled.h3`
  ${ snippets.headlineText}
`