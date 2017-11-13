import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import { dist } from '../../../config/styles';

class TimelineHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var years = [];
    for (var i = 0; i < this.props.data.rows.length; i++) {
      const row = this.props.data.rows[i];
      const newYear = <Year key={row.year}>{row.year}</Year>;
      years.push(newYear);
    }
    return (
      <Header onScroll={this.props.onscroll} className="SCTimelineHeader">
        <Scrollbars>
          {years}
        </Scrollbars>
      </Header>
    );
  }
}
TimelineHeader.propTypes = {
  data: PropTypes.object,
  onscroll: PropTypes.func
};

export default TimelineHeader;
const Header = styled.div`
    color: white;
    width:100%;
    overflow: auto;
    overflow-x: scroll;
    overflow-y: hidden;
    height: calc( ${dist.medium} + 15px );
    margin-bottom:-15px;
    position: absolute;
    top:0;
 `;

const Year = styled.span`
    margin: 0 2em;
    line-height: ${dist.medium};
    &:first-child { 
      margin-left: 4em; 
    }
 `;