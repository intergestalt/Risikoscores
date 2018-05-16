import React, { Component } from 'react';
import styled from 'styled-components';

import { colors } from '../../config/styles';

class GameBottom extends React.Component {
  render() {
    const page = this.props.page;
    if (page == 0) {
      return (
        <Bottom onClick={this.props.clickCallback}>{this.props.los}</Bottom>
      );
    } else if (page == 1) {
      return (
        <Bottom>
          <ResultSatz>{this.props.resultText}</ResultSatz>
          <ResultPercent>{this.props.resultPercent}</ResultPercent>
        </Bottom>
      );
    } else if (page == this.props.number + 2) {
      return (
        <Bottom>
          <ResultSatz>{this.props.resultText}</ResultSatz>
          <ResultPercent>{this.props.resultPercent}</ResultPercent>
        </Bottom>
      );
    } else {
      return (
        <Bottom>
          <ResultSatz>{this.props.resultText}</ResultSatz>
          <ResultPercent>{this.props.resultPercent}</ResultPercent>
        </Bottom>
      );
    }
  }
}

export default GameBottom;

const Bottom = styled.div`
  position: absolute;
  line-height: 1.1em;
  background-color: ${colors.turqoise};
  height: 38%;
  bottom: 0;
  width: 100%;
  font-family: 'Roboto Light';
`;
const ResultSatz = styled.div`
  line-height: 1.1em;
  height: 50%;
  width: 100%;
  font-family: 'Roboto Light';
`;
const ResultPercent = styled.div`
  line-height: 1.1em;
  height: 50%;
  width: 100%;
  font-family: 'Roboto Light';
`;
