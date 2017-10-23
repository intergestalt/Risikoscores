import React, { Component } from 'react';
import { QuestionsArea, GlossarArea, GraphArea } from './';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class RightColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Column className="RightColumn">
        <GlossarArea
          room={this.props.room}
          roomGlossar={this.props.roomGlossar}
        />
        <GraphArea
          room={this.props.room}
          graphNodeId={this.props.graphNodeId}
        />
        <QuestionsArea room={this.props.room} />
      </Column>
    );
  }
}

RightColumn.propTypes = {
  room: PropTypes.object,
  roomGlossar: PropTypes.object,
  graphNodeId: PropTypes.string
};

export default RightColumn;

const Column = styled.section`
  display: flex;
  flex-direction: column;
  > * {
    overflow: hidden;
    transition: all 0.3s;
  }
`;
