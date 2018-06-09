import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';

import { localeStr } from '../../helper/global';
import {
  setSelectGraphNode,
  getSelectGraphNode,
  getLanguage
} from '../../helper/actions';
import {
  getGraphColors,
  getTheRealGraph,
  getNeighbours,
  getColor
} from '../../helper/graph';
import { dist } from '../../config/styles';

class StartRoomMenu extends React.Component {
  constructor(props) {
    super(props);
    this.enterCallback = this.enterCallback.bind(this);
    this.leaveCallback = this.leaveCallback.bind(this);
  }
  selectRoom(roomId) {
    const realGraph = getTheRealGraph(this.props.graph);
    const neighbours = getNeighbours(roomId, realGraph);
    return neighbours;
  }

  enterCallback(e, roomId) {
    setSelectGraphNode(roomId);
  }

  leaveCallback(e) {
    setSelectGraphNode(null);
  }

  roomPath(roomId) {
    const lang = getLanguage();
    var path = '/rooms/' + roomId + '?language=' + lang;
    return path;
  }

  getRooms() {
    var result = [];
    const neighbourHash = {};

    if (this.props.selectedId) {
      const neighbourIds = this.selectRoom(this.props.selectedId);
      for (var i = 0; i < neighbourIds.length; i++) {
        neighbourHash[neighbourIds[i]] = true;
      }
    }

    for (var i = 0; i < this.props.rooms.length; i++) {
      const room = this.props.rooms[i];
      const roomId = room.key;
      var text = localeStr(room.name, this.props.lang);
      var selected = false;
      var neighbour = false;
      if (neighbourHash[roomId]) {
        neighbour = true;
      }
      if (roomId === this.props.selectedId) {
        selected = true;
      }

      var color = getColor('defaultLinkColor');
      if (selected) {
        color = getColor('selectedColor');
      }
      if (neighbour) {
        color = getColor('neighbourColor');
      }

      const neu = (
        <Li key={'_' + i}>
          <LinkStyled
            to={this.roomPath(roomId)}
            style={{ color: color }}
            onMouseEnter={e => {
              this.enterCallback(e, roomId);
            }}
            onMouseLeave={e => {
              this.leaveCallback(e);
            }}
          >
            {text}
          </LinkStyled>
        </Li>
      );
      result.push(neu);
    }
    return <Ul>{result}</Ul>;
  }

  render() {
    const rooms = this.getRooms();
    return <Container className="StartRoomMenu">{rooms}</Container>;
  }
}

StartRoomMenu.propTypes = {
  rooms: PropTypes.array,
  graph: PropTypes.array
};

export default withTracker(props => {
  return {
    selectedId: getSelectGraphNode(),
    lang: getLanguage()
  };
})(withRouter(StartRoomMenu));

const Container = styled.nav`
  position: relative;
  top: -${dist.lineTopDiff};
`;

const Li = styled.li`
  display: inline;
  &:after {
    content: '\\A';
  }
  white-space: pre;
`;

const Ul = styled.ul`
  position: absolute;
  pointer-events: none;
  & li {
    pointer-events: all;
  }
`;

const LinkStyled = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;
