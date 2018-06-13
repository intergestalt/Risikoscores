import React, { Component } from 'react';
import styled from 'styled-components';

import { colors, dist, snippets } from '../../config/styles';

class GameBottom extends React.Component {
  getMatch(num) {
    const sel = this.props.selected;
    if (num == 0 && sel == 0) {
      return true;
    }
    if (num == 1 && sel == 1) {
      return true;
    }
    if (num == 2 && sel == 2) {
      return true;
    }
    return false;
  }

  render() {
    const page = this.props.page;
    var grey = false;
    if (page == 0) {
      return (
        <Bottom grey={grey} onClick={this.props.clickCallback}>
          <HugeText clickable uppercase>
            {this.props.los}
          </HugeText>
        </Bottom>
      );
    } else if (page == 1) {
      if (this.props.selected < 0) grey = true;
      return (
        <Bottom grey={grey} onClick={this.props.clickCallback}>
          {this.props.selected < 0 ? (
            <NormalText>{this.props.resultText}</NormalText>
          ) : (
            <HugeText clickable>{this.props.resultText}</HugeText>
          )}
        </Bottom>
      );
    } else if (page == this.props.number + 2) {
      return (
        <Bottom grey={grey} onClick={this.props.clickCallback}>
          <NormalText>{this.props.resultText}</NormalText>
          <HugeText>{this.props.resultPercent}</HugeText>
        </Bottom>
      );
    } else {
      return (
        <Bottom grey={grey}>
          <NormalText>{this.props.resultText}</NormalText>
          <HugeText>{this.props.resultPercent}</HugeText>
        </Bottom>
      );
    }
  }
}

export default GameBottom;

const Bottom = styled.div`
  background-color: ${props =>
    !props.grey ? colors.paleblue : colors.lightgrey};
  height: 33.33%;
  display: flex;
  flex-direction: column;
  padding: ${dist.named.columnPadding};
  padding-top: calc(${dist.named.columnPadding} - ${dist.lineTopDiff});
  p + p {
    margin-top: 1em;
  }
`;

const NormalText = styled.div`
  cursor: ${props => (props.clickable ? 'pointer' : 'auto')};
`;

const HugeText = props => (
  <Huge {...props}>
    <span>{props.children}</span>
  </Huge>
);

const Huge = styled.div`
  ${snippets.gameHuge};
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  cursor: ${props => (props.clickable ? 'pointer' : 'auto')};
  ${props => (props.uppercase ? 'text-transform: uppercase' : null)};
`;
