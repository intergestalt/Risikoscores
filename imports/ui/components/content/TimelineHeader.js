import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { CustomScrollbars } from '../';
import { dist } from '../../../config/styles';

class TimelineHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleScrollFrame = this.handleScrollFrame.bind(this)
    this.yearsElems = new Map();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.scrollPos) {
      if (!this.props.isScrollLeader && nextProps.scrollPos) {
        this.scrollTo(this.timelineScrollPosToHeaderScrollPos(nextProps.scrollPos))
      }
      return false
    }
    return true;
  }

  timelineScrollPosToHeaderScrollPos([elemNumber, elemOffsetRel]) {
    const el = Array.from(this.yearsElems.values())[elemNumber]
    const left = el.offsetLeft;
    const width = el.offsetWidth;
    const x = left + (width * elemOffsetRel)
    return x;
  }

  headerScrollPosToTimelineScrollPos(scroll) {
    let currentElemNumber = 0;
    let currentElemOffsetRel = 0;
    for (let [y, el] of this.yearsElems) {
      let left = el.offsetLeft;
      let width = el.offsetWidth;
      let scrollPos = scroll.left * scroll.scrollWidth;
      let offset = scrollPos - left;
      if (offset <= width) {
        currentElemOffsetRel = offset / width
        break;
      }
      currentElemNumber++;
    }
    if (currentElemNumber >= this.yearsElems.size) {
      currentElemNumber = this.yearsElems.size - 1
      currentElemOffsetRel = 1
    }
    return [currentElemNumber, currentElemOffsetRel]
  }

  scrollTo(x = 0) {
    const scrollbars = this.scrollbars;
    scrollbars.scrollLeft(x * (scrollbars.getScrollWidth() / (scrollbars.getScrollWidth() + scrollbars.getClientWidth())));
  }

  handleScrollFrame(scroll) {
    if (!this.props.isScrollLeader) return;
    const timelineScrollPos = this.headerScrollPosToTimelineScrollPos(scroll)
    this.props.onScroll(timelineScrollPos)
  }

  render() {
    let years = [];
    for (var i = 0; i < this.props.data.rows.length; i++) {
      const row = this.props.data.rows[i];
      const newYear = <Year innerRef={(el) => this.yearsElems.set(row.year, el)} key={row.year}>{row.year}</Year>;
      years.push(newYear);
    }
    return (
      <Header className="SCTimelineHeader" onMouseEnter={this.props.onMouseEnter}>
        <CustomScrollbars blind shadeColor={this.props.tabColor} scrollbarsRef={el => this.scrollbars = el} onScrollFrame={this.handleScrollFrame}>
          {years}
        </CustomScrollbars>
      </Header>
    );
  }
}
TimelineHeader.propTypes = {
  data: PropTypes.object,
  onScroll: PropTypes.func,
  scrollPos: PropTypes.array
};

export default withTracker(props => {
  return {
    tabColor: Session.get('selectedTabColor')
  };
})(TimelineHeader);

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
    padding: 0 2em;
    line-height: ${dist.medium};
    &:first-child { padding-left: 4em }
    &:last-child { padding-right: 4em }
 `;