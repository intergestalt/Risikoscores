import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';

import { StartLeft, StartRight } from '../../components';
import Rooms from '../../../collections/rooms';
import TextFragments from '../../../collections/textFragments';
import { storeFragments } from '../../../helper/fragment';
import { startStreamTimeout } from '../../../helper/global';

class Start extends React.Component {
  componentDidMount() {
    startStreamTimeout();
  }

  componentDidMount() {
    document.documentElement.classList.toggle('noscroll', true)
  }

  componentWillUnmount() {
    document.documentElement.classList.toggle('noscroll', false)
  }

  renderRooms(rooms) {
    return (
      <ul>
        {rooms.map(room => {
          return (
            <li>
              <NavLink to={'rooms/' + room._id}>
                {room.name[this.props.language]}
              </NavLink>
            </li>
          );
        })}
      </ul>
    );
  }
  renderLoading() {
    return <div className="Start">Loading...</div>;
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

  return {
    rooms: Rooms.find().fetch(),
    fragments: TextFragments.find().fetch(),
    ready: sub.ready() && sub2.ready
  };
})(Start);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  & > * {
    flex:1;
    height: 100%;
  }
`;