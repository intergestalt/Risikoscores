import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import { CustomScrollbars } from '../';
import { AnnotatedAsset } from './';
import { getImageAsset } from '../../../helper/asset';
import { dist } from '../../../config/styles';

class TimelineBody extends React.Component {
  constructor(props) {
    super(props);
    this.detailClick = this.detailClick.bind(this);
    this.handleScrollFrame = this.handleScrollFrame.bind(this);
    this.yearsElems = new Map();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.scrollPos) {
      if (!this.props.isScrollLeader && nextProps.scrollPos) {
        this.scrollTo(
          this.timelineScrollPosToBodyScrollPos(nextProps.scrollPos)
        );
      }
      return false;
    }
    return true;
  }

  scrollTo(y = 0) {
    const scrollbars = this.scrollbars;
    scrollbars.scrollTop(
      y *
        (scrollbars.getScrollHeight() /
          (scrollbars.getScrollHeight() + scrollbars.getClientHeight()))
    );
  }

  timelineScrollPosToBodyScrollPos([elemNumber, elemOffsetRel]) {
    const el = Array.from(this.yearsElems.values())[elemNumber];
    const top = el.offsetTop;
    const height = el.offsetHeight;
    const y = top + height * elemOffsetRel;
    return y;
  }

  bodyScrollPosToTimelineScrollPos(scroll) {
    let currentElemNumber = 0;
    let currentElemOffsetRel = 0;
    for (let [y, el] of this.yearsElems) {
      let top = el.offsetTop;
      let height = el.offsetHeight;
      let scrollPos = scroll.top * scroll.scrollHeight;
      let offset = scrollPos - top;
      if (offset <= height) {
        currentElemOffsetRel = offset / height;
        break;
      }
      currentElemNumber++;
    }
    if (currentElemNumber >= this.yearsElems.size) {
      currentElemNumber = this.yearsElems.size - 1;
      currentElemOffsetRel = 1;
    }
    return [currentElemNumber, currentElemOffsetRel];
  }

  handleScrollFrame(scroll) {
    if (!this.props.isScrollLeader) return;
    const timelineScrollPos = this.bodyScrollPosToTimelineScrollPos(scroll);
    this.props.onScroll(timelineScrollPos);
  }

  detailClick(e, asset) {
    e.preventDefault();
    var index = getSliderAssetIndex(asset);
    setTabDetail(true, index);
  }

  renderYear(yearRow) {
    var all = [];
    for (var i = 0; i < yearRow.rows.length; i++) {
      const row = yearRow.rows[i];
      var myAsset = getImageAsset(
        row.asset,
        this.props.data.context.room,
        this.props.data.context.tab
      );
      const newRow = (
        <AnnotatedAsset
          key={'_' + i}
          asset={myAsset}
          text={row.asset.text}
          source={row.asset.source}
          clickCallback={this.detailClick}
        />
      );
      all.push(newRow);
    }
    return (
      <div
        ref={el => this.yearsElems.set(yearRow.year, el)}
        id={yearRow.year}
        key={yearRow.year}
      >
        {all}
      </div>
    );
  }

  render() {
    var years = [];

    for (var i = 0; i < this.props.data.rows.length; i++) {
      const row = this.props.data.rows[i];
      const newYear = this.renderYear(row);
      years.push(newYear);
    }
    return (
      <Container
        className="SCTimelineBody"
        onMouseEnter={this.props.onMouseEnter}
      >
        <CustomScrollbars
          scrollbarsRef={el => (this.scrollbars = el)}
          onScrollFrame={this.handleScrollFrame}
        >
          {years}
        </CustomScrollbars>
      </Container>
    );
  }
}
TimelineBody.propTypes = {
  data: PropTypes.object,
  onScroll: PropTypes.func,
  scrollPos: PropTypes.array
};

export default TimelineBody;

const Container = styled.div`
  position: relative;
  top: ${dist.medium};
  z-index: 1;
  flex: 1;
  height: 100%;
  height: calc(100% - ${dist.medium});
`;
