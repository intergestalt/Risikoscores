import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import styled from 'styled-components';

import { StartLeft, StartRight, Loading } from '../../components';
import Rooms from '../../../collections/rooms';
import TextFragments from '../../../collections/textFragments';
import { storeFragments } from '../../../helper/fragment';
import { startStreamTimeout } from '../../../helper/global';
import { setSelectedRoomId, setSelectGraphNode } from '../../../helper/actions';

class Start extends React.Component {
  componentDidMount() {
    setSelectedRoomId(null);
    setSelectGraphNode(null);
    document.documentElement.classList.toggle('noscroll', true);
    startStreamTimeout();
  }

  componentWillUnmount() {
    document.documentElement.classList.toggle('noscroll', false);
  }

  renderLoading() {
    return <Loading />;
  }

  render() {
    if (!this.props.ready) {
      return this.renderLoading();
    }
    storeFragments(this.props.fragments);
    return (
      <Container className="Start">
        <StartLeft rooms={this.props.rooms} />
        <StartRight rooms={this.props.rooms} />
      </Container>
    );
  }
}

export default withTracker(props => {
  const sub = Meteor.subscribe('rooms.list');
  const sub2 = Meteor.subscribe('fragments.list');
  const language = Session.get('language');
  const sort = {}; sort['name.' + language] = 1;

  return {
    rooms: Rooms.find({}, { sort }).fetch(),
    fragments: TextFragments.find().fetch(),
    ready: sub.ready() && sub2.ready(),
  };
})(Start);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  & > * {
    flex: 1;
    height: 100%;
  }
`;
