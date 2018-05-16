import React, { Component } from 'react';
import styled from 'styled-components';

import { colors } from '../../config/styles';

class GameBar extends React.Component {
  render() {
    const page = this.props.page;
    if (page == 0) {
      return <Bar>{this.props.text}</Bar>;
    } else if (page == 1) {
      return <Bar>{this.props.text}</Bar>;
    } else if (page == this.props.number + 2) {
      return <Bar>{this.props.text}</Bar>;
    } else {
      var aknum = this.props.page - 1;
      return (
        <Bar>
          {this.props.text} {aknum}/{this.props.number}
        </Bar>
      );
    }
  }
}

export default GameBar;

const Bar = styled.div`
  line-height: 1.1em;
  background-color: ${colors.lightgrey};
  font-family: 'Roboto Light';
  width: 100%;
`;
