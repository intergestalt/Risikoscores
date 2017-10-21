import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { StartRoomMenuArea, StartGeneralMenuArea, StartGraphArea } from './';
import { colors } from '../../config/styles';

class StartRight extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className="StartRight">
        <StartRoomMenuArea rooms={this.props.rooms} />
        <StartGeneralMenuArea />
        <StartGraphArea />
      </Container>
    );
  }
}

StartRight.propTypes = {
  rooms: PropTypes.array
};

export default StartRight;

const Container = styled.div`
  background-color: ${colors.darkgrey}
`;
