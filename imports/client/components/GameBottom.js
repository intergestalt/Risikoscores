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
        <Bottom
          layout={this.props.layout}
          grey={grey}
          onClick={this.props.clickCallback}
        >
          <HugeText layout={this.props.layout} clickable uppercase>
            {this.props.los}
          </HugeText>
        </Bottom>
      );
    } else if (page == 1) {
      if (this.props.selected < 0) grey = true;
      return (
        <Bottom
          layout={this.props.layout}
          grey={grey}
          onClick={this.props.clickCallback}
        >
          {this.props.selected < 0 ? (
            <NormalText layout={this.props.layout}>
              {this.props.resultText}
            </NormalText>
          ) : (
            <HugeText layout={this.props.layout} clickable>
              {this.props.resultText}
            </HugeText>
          )}
        </Bottom>
      );
    } else if (page == this.props.number + 2) {
      return (
        <Bottom
          layout={this.props.layout}
          grey={grey}
          onClick={this.props.clickCallback}
        >
          <NormalText layout={this.props.layout}>
            {this.props.resultText}
          </NormalText>
          <HugeText layout={this.props.layout}>
            {this.props.resultPercent}
          </HugeText>
        </Bottom>
      );
    } else {
      return (
        <Bottom layout={this.props.layout} grey={grey}>
          <NormalText layout={this.props.layout}>
            {this.props.resultText}
          </NormalText>
          <HugeText layout={this.props.layout}>
            {this.props.resultPercent}
          </HugeText>
        </Bottom>
      );
    }
  }
}

export default GameBottom;

const Bottom = styled.div`
  ${props =>
    props.layout
      ? `background-color: ${!props.grey ? colors.paleblue : colors.lightgrey};
  
  display: flex;
  flex-direction: column;
  padding: ${dist.named.columnPadding};
  padding-top: calc(${dist.named.columnPadding} - ${dist.lineTopDiff});
  p + p {
    margin-top: 1em;
  }`
      : `background-color:${colors.lightorange}`};
  height: 33.33%;
`;

const NormalText = styled.div`
  ${props =>
    props.layout ? `cursor: ${props.clickable ? 'pointer' : 'auto'};` : ''};
`;

const HugeText = props => (
  <Huge {...props}>
    <span>{props.children}</span>
  </Huge>
);

const Huge = styled.div`
  ${props =>
    props.layout
      ? `${snippets.gameHuge};
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  cursor: ${props.clickable ? 'pointer' : 'auto'};
  ${props.uppercase ? 'text-transform: uppercase' : null};`
      : ''};
`;
