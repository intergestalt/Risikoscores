import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import Rooms from '../../collections/rooms';
import styled from 'styled-components';
import { getFragment } from '../../helper/fragment';

class GraphHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var title = this.props.title || getFragment('graphTitle');
    return (
      <Container className="GraphHeader">
        <h3>{title}</h3>
      </Container>
    );
  }
}

export default withTracker(props => {
  const sub2 = Meteor.subscribe('rooms.list');
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
