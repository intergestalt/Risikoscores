import React, { Component } from 'react';
import { MainImages, MainContent } from './';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from '../../config/styles';
import { exists } from '../../helper/global';

class MainColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var images = null;
    var roomFolder = null;
    if (exists(this.props.room)) {
      roomFolder = this.props.room.key;
      images = this.props.room.images;
    }
    return (
      <Column className="MainColumn">
        <MainImages roomFolder={roomFolder} images={images} />
        <MainContent style={{ overflow: 'auto' }} room={this.props.room} />
      </Column>
    );
  }
}
MainColumn.propTypes = {
  room: PropTypes.object
};

export default MainColumn;

const Column = styled.section`
  background-color: ${colors.lightgrey};
  height: 100%;
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;
