import React, { Component } from 'react';
import { MainImages, MainContent } from './';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import { colors } from '../../config/styles';

class MainColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Column className="MainColumn">
        <Scrollbars>
          <MainImages
            roomFolder={this.props.room._id}
            images={this.props.room.images}
          />
          <MainContent style={{ overflow: "auto" }} room={this.props.room} />
        </Scrollbars>
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
  height:100%;
  overflow: auto;
`;
