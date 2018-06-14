import React, { Component } from 'react';
import styled from 'styled-components';

import { colors, dist } from '../../config/styles';

class GameBar extends React.Component {
  render() {
    const page = this.props.page;
    if (page == 0) {
      return <Bar layout={this.props.layout}>{this.props.text}</Bar>;
    } else if (page == 1) {
      return <Bar layout={this.props.layout}>{this.props.text}</Bar>;
    } else if (page == this.props.number + 2) {
      return <Bar layout={this.props.layout}>{this.props.text}</Bar>;
    } else {
      var aknum = this.props.page - 1;
      return (
        <Bar layout={this.props.layout}>
          {this.props.text} {aknum}/{this.props.number}
        </Bar>
      );
    }
  }
}

export default GameBar;

const Bar = styled.div`
  ${props =>
    props.layout
      ? `background-color: ${colors.lightgrey};
  padding: ${dist.named.columnPadding};
  padding-top: calc(${dist.named.columnPadding} - ${dist.lineTopDiff});
  padding-bottom: calc(${dist.named.columnPadding} - ${dist.lineBottomDiff});`
      : `background-color: ${colors.white}`};
`;
