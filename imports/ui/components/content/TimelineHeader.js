import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import { dist } from '../../../config/styles';

class TimelineHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log(this.props, nextProps)
    //const s = nextProps.scrollState
    if (nextProps.scrollPos) {
      //console.log(nextProps, this.props)
      if (!this.props.isScrollLeader && nextProps.scrollPos) {
        this.scrollTo(nextProps.scrollPos)
      }
      return false
    }
    return true;
  }

  scrollTo(x = 0) {
    const scrollbars = this.scrollbars;
    //console.log(x, scrollbars.getScrollWidth(), scrollbars.getClientWidth()); //return;
    scrollbars.scrollLeft(x * (scrollbars.getScrollWidth() - scrollbars.getClientWidth()));
  }

  render() {
    var years = [];
    for (var i = 0; i < this.props.data.rows.length; i++) {
      const row = this.props.data.rows[i];
      const newYear = <Year key={row.year}>{row.year}</Year>;
      years.push(newYear);
    }
    return (
      <Header className="SCTimelineHeader" onMouseEnter={this.props.onMouseEnter}>
        <Scrollbars ref={el => this.scrollbars = el} onScrollFrame={this.props.onScrollFrame}>
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