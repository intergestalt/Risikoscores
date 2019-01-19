import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import styled from 'styled-components';

import { StartLeft, StartRight, Loading, Logo } from '../../components';
import Rooms from '../../../collections/rooms';
import TextFragments from '../../../collections/textFragments';
import { storeFragments } from '../../../helper/fragment';
import { storeRooms } from '../../../helper/room';
import { startPopupsTimeout } from '../../../helper/popup';
import { setSelectedRoomId, setSelectGraphNode } from '../../../helper/actions';
import { exists } from '../../../helper/global';
import { dist } from '../../../config/styles';

import { startStreamTimeout } from '../../../helper/stream';

class Start extends React.Component {
  componentDidMount() {
    setSelectedRoomId(null);
    setSelectGraphNode(null);
    document.documentElement.classList.toggle('noscroll', true);
    startStreamTimeout();
    startPopupsTimeout();
  }

  componentWillMount() {
    Session.set('imageLayout', "half");
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
    storeRooms(this.props.rooms);
    return (
      <Container className="Start">
        <StartLeft rooms={this.props.rooms} />
        <StartRight rooms={this.props.rooms} />
        <LogoContainer>
          <Logo />
        </LogoContainer>
      </Container>
    );
  }
}

export default withTracker(props => {
  const sub = Meteor.subscribe('rooms.list');
  const sub2 = Meteor.subscribe('fragments.list');
  const language = Session.get('language');
  const sort = {};
  sort['name.' + language] = 1;

  return {
    rooms: Rooms.find({}, { sort }).fetch(),
    fragments: TextFragments.find().fetch(),
    ready: sub.ready() && sub2.ready()
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

const LogoContainer = styled.div`
  height: auto;
  position: fixed;
  right: ${ dist.small };
  bottom: ${ dist.small};
  @media screen and (max-width: 65em) {
    /*bottom: calc( 1em + ${ dist.medium } );*/
    left: calc( 50vw );
  }
`;