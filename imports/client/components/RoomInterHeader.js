import React, { Component } from 'react';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';

import { getFragment } from '../../helper/fragment';
import { dist, snippets } from '../../config/styles';
import { localeStr, exists } from '../../helper/global';
import { getCachedRooms } from '../../helper/actions';

class RoomInterHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var title = getFragment('roomInterTitle');
    title = ' ';
    const rooms = getCachedRooms();
    if (exists(rooms)) {
      var room1 = rooms[this.props.roomId];
      var room2 = rooms[this.props.targetId];
      if (exists(room1) && exists(room2)) {
        title = localeStr(room1) + ' -> ' + localeStr(room2);
      }
    }
    return <Header className="RoomQuestionsHeader">{title}</Header>;
  }
}

export default withTracker(props => {
  return {};
})(RoomInterHeader);

const Header = styled.h3`
  padding: 0 ${dist.named.columnPadding};
  ${ snippets.headlineText}
`;
