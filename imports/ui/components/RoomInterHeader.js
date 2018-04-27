import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';

import { getFragment } from '../../helper/fragment';
import { dist } from '../../config/styles';
import { localeStr } from '../../helper/global';
import Rooms from '../../collections/rooms';

class RoomInterHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var title = getFragment('roomInterTitle');
    title = '';
    if (this.props.ready) {
      title =
        localeStr(this.props.room.name) +
        ' -> ' +
        localeStr(this.props.room2.name);
    }
    return <Header className="RoomQuestionsHeader">{title}</Header>;
  }
}

export default withTracker(props => {
  const sub2 = Meteor.subscribe('room');
  const room = Rooms.findOne({ key: props.roomId });
  const title = localeStr(room.name);
  const room2 = Rooms.findOne({ key: props.targetId });
  ready = sub2.ready();
  return {
    room: room,
    room2: room2,
    ready: ready
  };
})(RoomInterHeader);
const Header = styled.h3`
  padding: 0 ${dist.named.columnPadding};
`;
